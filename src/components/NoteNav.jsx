import React from 'react'
import styled from 'styled-components'
import Note from './Note'
import PopupBox from './PopupBox'
import { FiPlus } from "react-icons/fi"

const NavContainer = styled.div`
  max-width: 25vw;
  min-width: 25vw;
  background-color: rgba(0,0,0,.02);
`

const NoteContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 10.1em);
  min-height: calc(100vh - 10.1em);
  transition: all .3s;
  scrollbar-color: rgba(0,0,0, .05) rgba(0,0,0,0);
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0,0,0, .05);
    border: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0,0,0, .08);
  }
  ::-webkit-scrollbar-thumb:active {
    background: rgba(0,0,0, .08);
  }
  ::-webkit-scrollbar-track {
    background: #rgba(0,0,0,0);
    border: 0px none #ffffff;
  }
  ::-webkit-scrollbar-track:hover {
    background: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track:active {
    background: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

`
const New = styled.div`
  width: 60%;
  margin: .5em auto .5em;
  padding: .4em 0 .3em;
  text-align: center;
  font-size: 1.5em;
  color: rgba(0,0,0, .3);
  background-color: rgba(255,255,255,1);
  border: 1px solid rgba(0,0,0, .07);
  border-radius: 40px;
  cursor: pointer;
  transition: .3s;

  :hover {
    border: 1px solid rgba(0,0,0, .15);
    color: rgba(0,0,0, .7);
  }
`

const Toolbox = styled.div`
  height: 3.4em;
  padding: .5em .3em;
  width: 100%;;
  text-align: center;
  box-sizing: border-box;
  border-right: 1px solid rgba(0,0,0,.05);
  font-size: 1.6em;
  font-weight: 500;
  display: flex;
  justify-content: flex-end;
`

const EmptyNav = styled.div`
  width: 80%;
  margin: auto;
  font-size: 1.3em;
  padding: 1em;
  text-align: center;
  color: rgba(0,0,0, .3);
`

const NoteNav = ({ data, onNoteClick, onDeleteClick, reset, creationFilter, updateFilter, markedFilter, filterValue }) => {

  return (
    <NavContainer>
      <New onClick={reset}> <FiPlus /> </New>
      <NoteContainer>
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
    </NoteContainer>
      <Toolbox>
        <PopupBox
          filter
          orderByCreation={creationFilter}
          orderByUpdate={updateFilter}
          orderByMarked={markedFilter}
          filterValue={filterValue} />
      </Toolbox>
    </NavContainer>
  )
}

export default NoteNav
