import React from 'react'
import styled from 'styled-components'
import Note from './Note'
import { FiPlus } from "react-icons/fi"

const NavContainer = styled.div`
  max-width: 25vw;
  min-width: 25vw;
  background-color: rgba(0,0,0,.02);
`

const NoteContaier = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 5.45em);
  min-height: calc(100vh - 5.45em);
`
const New = styled.div`
  width: 60%;
  margin: .5em auto 1em;
  padding: .4em 0 .3em;
  text-align: center;
  font-size: 1.5em;
  color: rgba(0,0,0, .3);
  background-color: white;
  border: 1px solid rgba(0,0,0, .07);
  border-radius: 40px;
  cursor: pointer;
  transition: .3s;

  :hover {
    border: 1px solid rgba(0,0,0, .15);
    color: rgba(0,0,0, .7);
  }
`

const EmptyNav = styled.div`
  width: 80%;
  margin: auto;
  font-size: 1.3em;
  padding: 1em;
  text-align: center;
  color: rgba(0,0,0, .3);
`

const NoteNav = ({ data, onNoteClick, onDeleteClick, reset }) => {
  return (
    <NavContainer>
      <New onClick={reset}> <FiPlus /> </New>
      <NoteContaier>
        {(!!data && data.length === 0) && <EmptyNav> No notes to display ... </EmptyNav>}
        {(!!data && data.length === 1) && (
          <Note
            title={data[0].title}
            note={data[0].note}
            marked={data[0].marked}
            onClick={() => onNoteClick(data[0].title, data[0].note,data[0].marked, data[0].id )}
            eximo={() => onDeleteClick(data[0].id)}
          />
        )}
        {(!!data && data.length > 1) && data.map(items => (
          <Note
            key={items.id}
            title={items.title}
            note={items.note}
            marked={items.marked}
            onClick={() => onNoteClick(items.title, items.note, items.marked, items.id)}
            eximo={() => onDeleteClick(items.id)}
          />
        )
      )}
      </NoteContaier>
    </NavContainer>
  )
}

export default NoteNav
