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

const NoteNav = ({ data, onNoteClick }) => {
  return (
    <NavContainer>
      {(!!data && data.length === 1) && (
        <Note
          title={data[0].title}
          note={data[0].note}
          marked={data[0].marked}
          onClick={() => onNoteClick(data[0].title, data[0].note, data[0].id )} />
      )}
      {(!!data && data.length > 1) && data.map(items => (
        <Note
          key={items.id}
          title={items.title}
          note={items.note}
          marked={items.marked}
          onClick={() => onNoteClick(items.title, items.note, items.id)}
        />
      )
    )}
    </NavContainer>
  )
}

export default NoteNav
