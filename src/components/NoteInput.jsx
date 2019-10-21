import React from 'react'
import styled from 'styled-components'

const MainInput = styled.textarea`
  display: block;
  box-sizing: border-box;
  min-width: 100%;
  max-width: 100%;
  height: calc(100% - 7.2em);
  border: 0;
  padding: 1em 1.5em 0em 1.5em;
  resize: none;
  font-family: 'Montserrat', sans-serif;;
  font-weight: 400;
  font-size: 1.4em;
  letter-spacing: 1px;
  word-spacing: 2px;
  color: rgba(0,0,0, .8);
  
  :focus {
    outline: 0;
  }
`

const NoteInput = ({ onChange, value }) => {
  return (
      <MainInput type="text" placeholder="write your note ..." onChange={onChange} value={value}/>
  )
}

export default NoteInput
