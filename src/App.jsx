import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from './config/firebase'

import NoteNav from './components/NoteNav'
import NoteEditor from './components/NoteEditor'

const NotesContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500&display=swap');
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  overflow: hidden;
`

const App = () => {

  const [ title, setTitle ] = useState('')
  const [ note, setNote ] = useState('')
  const [ marked, setMark ] = useState(false)
  const [ data, setData ] = useState([])
  const [ usedId, setExistingId ] = useState(undefined)
  const [ done, setReqState ] = useState(false)
  const [ action, setAction ] = useState('')
  const [ filterIndicator, setFilterIndicator ] = useState('')

  const db = firebase.firestore()
  const notes = db.collection('notes')

  const Requestor = () => {
    notes.get()
    .then((querySnapshot) => {
      let allNotes = []
      querySnapshot.forEach((items) => {
        const reqData = items.data()
        allNotes.push(reqData)
      })
      setData(allNotes.sort((a,b) => {
        setFilterIndicator('UPDATE')
        return b.modifiedAt - a.modifiedAt
      }))
    })
  }
  const filterByModifDate = () => {
    setData([...data].sort((a,b) => {
      setFilterIndicator('UPDATE')
      return b.modifiedAt - a.modifiedAt
    }))
  }

  const filterByCreaDate = () => {
    setData([...data].sort((a,b) => {
      setFilterIndicator('CREATION')
      return b.createdAt - a.createdAt
    }))
  }

  const filterByMarked = () => {
    setData([...data].sort((a,b) => {
      setFilterIndicator('MARKED')
      return b.marked - a.marked
    }))
  }

  const Resetor = () => {
    setTitle('')
    setNote('')
    setExistingId(undefined)
  }

  useEffect(() => {
    Requestor()
    // eslint-disable-next-line
  }, [])

  const handleTitleChange = e => {
    setTitle(e.target.value.toUpperCase())
  }

  const handleMark = value => {
    setMark(value)
  }

  const handleNoteChange = e => {
    setNote(e.target.value)
  }

  const sendOrUpdate = async () => {
    if (!!title && usedId === undefined) {
      const id = Math.random().toString(36).slice(2).padEnd(11,0)
      await handleToast('Added', false)
      db.collection("notes").doc(id).set({id: id, title: title, note: note, marked: marked, createdAt: Date.now(), modifiedAt: Date.now() })
      Requestor()
      Resetor()
      handleToast('Added', true)
    } else if (!!usedId) {
      await handleToast('Updated', false)
      db.collection("notes").doc(usedId).update({
        title: title,
        note: note,
        marked: marked,
        modifiedAt: Date.now()
      })
      .then(
        Requestor(),
        handleToast('Updated', true)
      )
    }
  }

  const handleNoteClick = (clickedTitle, clickedNote, clickedMark, clickedId) => {
    setTitle(clickedTitle)
    setNote(clickedNote)
    setMark(clickedMark)
    setExistingId(clickedId)
  }

  const handleDeleteNote = async (deleteId) => {
    await handleToast('deleted', false)
    db.collection("notes").doc(deleteId).delete()
    .then( () => deleteId === usedId ? (Requestor(), Resetor(), handleToast('deleted', true)) : Requestor(), handleToast('deleted', true))
  }

  const handleToast = (text, reqState) => {
    setAction(text)
    setReqState(reqState)
    setTimeout(() => {
      setReqState(!reqState)
    }, 1500)
  }

  return (
    <NotesContainer>
      <NoteNav
        data={data}
        onNoteClick={handleNoteClick}
        onDeleteClick={handleDeleteNote}
        reset={() => Resetor()}
        creationFilter={filterByCreaDate}
        updateFilter={filterByModifDate}
        markedFilter={filterByMarked}
        filterValue={filterIndicator}
      />
      <NoteEditor
        onTitleChange={handleTitleChange}
        onNoteChange={handleNoteChange}
        onClickMark={handleMark}
        onClickSend={() => sendOrUpdate()}
        note={note}
        title={title}
        marked={marked}
        reqState={done}
        action={action}
       />
    </NotesContainer>
  )
}

export default App
