import React from 'react'
import styled from 'styled-components'
import Note from './Note'

const NavContainer = styled.div`
  max-width: 25vw;
  min-width: 25vw;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: auto;
  background-color: rgba(0,0,0,.02);
`

const NoteNav = () => {
  return (
    <NavContainer>
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
    </NavContainer>
  )
}

export default NoteNav
