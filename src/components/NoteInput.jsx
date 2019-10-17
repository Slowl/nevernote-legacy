import React from 'react'
import styled from 'styled-components'

const MainInput = styled.textarea`
  display: block;
  box-sizing: border-box;
  min-width: 100%;
  max-width: 100%;
  height: calc(100% - 7.2em);
  border: 0;
  padding: 1.5em;
  resize: none;
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  font-size: 1.4em;
  letter-spacing: 1px;
  word-spacing: 2px;
  color: #2f2f2f;
`

const NoteInput = () => {
  return (
      <MainInput type="text" placeholder="write your note ..." />
  )
}

export default NoteInput
