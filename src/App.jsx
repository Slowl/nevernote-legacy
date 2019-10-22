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
`

const App = () => {

  const [ title, setTitle ] = useState('')
  const [ note, setNote ] = useState('')
  const [ marked, setMark ] = useState(false)
  const [ data, setData ] = useState()
  const [ usedId, setExistingId ] = useState(undefined)
  const [ done, setReqState ] = useState(false)
  const [ action, setAction ] = useState('')

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
      setData(allNotes)
    })
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
    setTitle(e.target.value)
  }

  const handleMark = value => {
    setMark(value)
  }

  const handleNoteChange = e => {
    setNote(e.target.value)
  }

  const sendOrUpdate = async () => {
    const id = Math.random().toString(36).slice(2).padEnd(11,0)

    if ((!!title && !!note) && usedId === undefined) {
      await handleToast('Added', false)
      db.collection("notes").doc(id).set({id: id, title: title, note: note, marked: marked, createdAt: Date.now() })
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
        handleToast('Updated', true),
        Requestor()
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
