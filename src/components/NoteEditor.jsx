import React from 'react'
import styled from 'styled-components'
import { FiCheck } from "react-icons/fi"

import TitleInput from './TitleInput'
import NoteInput from './NoteInput'

const EditorContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Oswald:300,400&display=swap');
  max-width: 75vw;
  min-width: 75vw;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: auto;
`
const Button = styled.div`
  padding: .6em 0 .4em;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  background-color: rgba(191, 50, 50, .8);
  color: white;
  font-size: 2.2em;
  font-weight: 500;
  cursor: pointer;
  transition: .4s;

  :hover {
    background-color: rgba(191, 50, 50, 1);
  }
`

const NoteEditor = () => {
  return (
    <EditorContainer>
      <TitleInput />
      <NoteInput />
      <Button> <FiCheck /> </Button>
    </EditorContainer>
  )
}

export default NoteEditor
