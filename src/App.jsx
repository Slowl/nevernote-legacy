import React from 'react'
import styled from 'styled-components'

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

function App() {
  return (
    <NotesContainer>
      <NoteNav />
      <NoteEditor />
    </NotesContainer>
  )
}

export default App
