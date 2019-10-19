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
  const [ usedId, setExistingId ] = useState()

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

  const sendOrUpdate = () => {
    const id = Math.random().toString(36).slice(2).padEnd(11,0)

    if ((!!title && !!note) && usedId === undefined) {
      db.collection("notes").doc(id).set({id: id, title: title, note: note, marked: marked, createdAt: Date.now() })
      setTitle('')
      setNote('')
    } else if (!!usedId) {
      db.collection("notes").doc(usedId).update({
        title: title,
        note: note,
        marked: marked,
        modifiedAt: Date.now()
      })
    }
  }

  const handleNoteClick = (clickedTitle, clickedNote, clickedId) => {
    setTitle(clickedTitle)
    setNote(clickedNote)
    setExistingId(clickedId)
  }

  return (
    <NotesContainer>
      <NoteNav data={data} onNoteClick={handleNoteClick} />
      <NoteEditor
        onTitleChange={handleTitleChange}
        onNoteChange={handleNoteChange}
        onClickMark={handleMark}
        onClickSend={() => sendOrUpdate()}
        note={note}
        title={title}
        marked={marked}
       />
    </NotesContainer>
  )
}

export default App
