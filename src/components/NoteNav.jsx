import React from 'react'
import styled from 'styled-components'
import Note from './Note'
import PopupBox from './PopupBox'
import { FiPlus, FiSun, FiMoon, FiChevronRight } from "react-icons/fi"

const NavContainer = styled.div`
  max-width: 25vw;
  min-width: 25vw;
  background-color: ${props => props.theme.navbg};
  transition: all ease .4s;
  @media screen and (max-width: 45em) {
    position: absolute;
    transform: ${props => props.slided ? "translateX(0px)" : "translateX(-425px)"};
    max-width: 100vw;
    min-width: 100vw;
    transition: .7s;
 }
`

const NoteContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 10.1em);
  min-height: calc(100vh - 10.1em);
  transition: all .3s;
  scrollbar-color: ${props => props.theme.grey05} rgba(0,0,0,0);
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.grey05};
    border: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.grey08};
  }
  ::-webkit-scrollbar-thumb:active {
    background: ${props => props.theme.grey08};
  }
  ::-webkit-scrollbar-track {
    background: #rgba(0,0,0,0);
    border: 0px none ${props => props.theme.white};
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
  color: ${props => props.theme.grey3};
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.grey07};
  border-radius: 40px;
  cursor: pointer;
  transition: .4s;

  :hover {
    border: 1px solid ${props => props.theme.grey1bis};
    color: ${props => props.theme.grey7};
  }
`

const Toolbox = styled.div`
  height: 3.4em;
  padding: .5em .3em;
  width: 100%;;
  text-align: center;
  box-sizing: border-box;
  border-right: 1px solid ${props => props.theme.grey05};
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
  color: ${props => props.theme.grey3};
`

const Button = styled.div`
  padding: .7em .7em .3em;
  margin: 0 .2em;
  border-radius: 50px;
  color: ${props => props.active ? `${props.theme.grey4}` : `${props.theme.grey2}`};
  background-color: ${props => props.active && `${props.theme.grey05}`};
  cursor: pointer;
  transition: .3s;

  :hover {
    background-color: ${props => props.theme.grey05};
    color: ${props => props.theme.grey4};
  }
`
const SwipeIndicator = styled.div`
  display: none;

  @media screen and (max-width: 45em) {
    display: block;
    position: absolute;
    background-color: ${props => props.theme.navbg};
    border-radius: 40px;
    width: 25px;
    height: 25px;
    right: ${props => props.open ? "0px" : "-70px"};;
    top: 50%;
    transform: ${props => props.open ? "rotate(180deg)" : "rotate(0deg)"};
    transition: .5s;

    svg {
      padding: .12em .1em .1em .25em;
      color: ${props => props.theme.grey6};
      font-size: 1.15em;
    }
  }

`

const NoteNav = ({ data, onNoteClick, onDeleteClick, reset, creationFilter, updateFilter, markedFilter, filterValue, switchTheme, themeValue, swipe }) => {

  return (
    <NavContainer slided={swipe}>
      <SwipeIndicator open={swipe}><FiChevronRight /></SwipeIndicator>
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
        <Button onClick={() => switchTheme()}>
          {!!themeValue ? <FiMoon /> : <FiSun />}
        </Button>
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
