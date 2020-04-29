import React from 'react'
import styled from 'styled-components'
import { FiCheck } from "react-icons/fi"

import TitleInput from './TitleInput'
import NoteInput from './NoteInput'
import Toast from './Toast'

const EditorContainer = styled.div`
  max-width: 75vw;
  min-width: 75vw;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: hidden;
  transition: all ease .4s;
  @media screen and (max-width: 45em) {
    max-width: 100vw;
    min-width: 100vw;
    overflow-x: hidden;
 }
`
const Button = styled.div`
  padding: .6em 0 .4em;
  width: 100%;
  border-top: 1px solid ${props => props.theme.grey08};
  color: ${props => props.theme.grey3};
  text-align: center;
  box-sizing: border-box;
  font-size: 2.2em;
  font-weight: 500;
  cursor: pointer;
  transition: .4s;

  :hover {
    background-color: ${props => props.theme.grey04};
    border-top: 1px solid ${props => props.theme.grey01};
    color: ${props => props.theme.grey8};
  }
`

const NoteEditor = ({ onTitleChange, onNoteChange, onClickMark, onClickSend, note, title, marked, reqState, action }) => {

  return (
    <EditorContainer>
      <TitleInput onChange={onTitleChange} onClick={onClickMark} value={title} selected={marked}/>
      <NoteInput onChange={onNoteChange} value={note} />
      <Button onClick={onClickSend}> <FiCheck /> </Button>
      <Toast done={reqState} text={action}/>
    </EditorContainer>
  )
}

export default NoteEditor
