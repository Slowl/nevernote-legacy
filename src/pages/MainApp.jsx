import styled, { ThemeProvider } from 'styled-components'
import { useState, useEffect, useContext, useCallback } from 'react'
import localforage from 'localforage'
import Swipe from 'react-easy-swipe'
import { UserContext } from "../providers/userProvider"
import { firestore, logOut } from '../config/firebase'
import { LIGHT, DARK } from '../config/colors.js'
import { FiChevronRight } from "react-icons/fi"

import NoteNav from '../components/NoteNav'
import NoteEditor from '../components/NoteEditor'
import Login from './Login'


const NotesContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400;500&display=swap');
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: ${props => props.theme.white};
  transition: all ease .4s;
`

const SwipeIndicator = styled.div`
  display: none;

  @media screen and (max-width: 45em) {
    z-index: 1000;
    display: block;
    position: absolute;
    background-color: ${props => props.open ? `${props.theme.navbg}` : `${props.theme.white}`};
    border-radius: 40px;
    width: 25px;
    height: 25px;
    right: ${props => props.open ? `-4px` : `calc(${props.windowWidth}px - 24px)`};
    top: 50%;
    transform: ${props => props.open ? "rotate(180deg)" : "rotate(0deg)"};
    transition: all .6s;

    svg {
      padding: .12em .1em .1em .25em;
      color: ${props => props.theme.grey6};
      font-size: 1.15em;
    }
  }
`

const MainApp = () => {

  const user = useContext(UserContext)
  const [ title, setTitle ] = useState('')
  const [ note, setNote ] = useState('')
  const [ marked, setMarked ] = useState(false)
  const [ data, setData ] = useState([])
  const [ usedId, setUsedId ] = useState(undefined)
  const [ done, setReqState ] = useState(false)
  const [ action, setAction ] = useState('')
  const [ filterIndicator, setFilterIndicator ] = useState('')
  const [ theme, setTheme ] = useState(DARK)
  const [ isLight, setThemeIsLight ] = useState(false)
  const [ isSwiped, setSwipe ] = useState(true)
  const [ windowWidth, setWindowsWidth ] = useState(0)
  const [ isLogged, setIsLogged ] = useState(false)

  const db = firestore
  const notes = db.collection('notes')

  const Requestor = useCallback(() => {
    notes.get()
    .then((querySnapshot) => {
      let allNotes = []
      querySnapshot.forEach((items) => {
        const reqData = items.data()
        allNotes.push(reqData)
      })
      setData(allNotes.sort((a,b) => {
        setFilterIndicator('UPDATE')
        return b.modifiedAt - a.modifiedAt
      }))
    })
  }, [])

  useEffect(() => {
    isLogged && Requestor()
    setWindowsWidth(window.innerWidth)
    localforage.getItem('localTheme').then(val => {
      val !== null && setTheme(val)
      if(JSON.stringify(val) === JSON.stringify(DARK)){
        setThemeIsLight(false)
      } else {
        setThemeIsLight(true)
      }
    })
  }, [Requestor, isLogged])

  useEffect(() => {
    !user && setIsLogged(false)
  }, [user, setIsLogged])

  const themeSwitcher = () => {
    if(JSON.stringify(theme) === JSON.stringify(DARK)){
      setTheme(LIGHT)
      setThemeIsLight(true)
      localforage.setItem('localTheme', LIGHT)
    } else {
      setTheme(DARK)
      setThemeIsLight(false)
      localforage.setItem('localTheme', DARK)
    }
  }

  const filterByModifDate = () => {
    setData([...data].sort((a,b) => {
      setFilterIndicator('UPDATE')
      return b.modifiedAt - a.modifiedAt
    }))
  }

  const filterByCreaDate = () => {
    setData([...data].sort((a,b) => {
      setFilterIndicator('CREATION')
      return b.createdAt - a.createdAt
    }))
  }

  const filterByMarked = () => {
    setData([...data].sort((a,b) => {
      setFilterIndicator('MARKED')
      return b.marked - a.marked
    }))
  }

  const Resetor = () => {
    setTitle('')
    setNote('')
    setUsedId(undefined)
    onSwipeLeft()
  }

  const onSwipeRight = () => {
    setSwipe(true)
  }

  const onSwipeLeft = () => {
    setSwipe(false)
  }

  const handleTitleChange = e => {
    setTitle(e.target.value.toUpperCase())
  }

  const handleMark = value => {
    setMarked(value)
  }

  const handleNoteChange = e => {
    setNote(e.target.value)
  }

  const sendOrUpdate = async () => {
    if (!!title && usedId === undefined) {
      const id = Math.random().toString(36).slice(2).padEnd(11,0)
      handleToast('Added', false)
      db.collection("notes").doc(id).set({id: id, title: title, note: note, marked: marked, createdAt: Date.now(), modifiedAt: Date.now() })
      Requestor()
      Resetor()
      handleToast('Adding the note ... ', true)
    } else if (!!usedId) {
      handleToast('Updating the note ...', false)
      db.collection("notes").doc(usedId).update({
        title: title,
        note: note,
        marked: marked,
        modifiedAt: Date.now()
      })
      .then(
        Requestor(),
        handleToast('Updating the note ...', true)
      )
    }
  }

  const handleNoteClick = (clickedTitle, clickedNote, clickedMark, clickedId) => {
    setTitle(clickedTitle)
    setNote(clickedNote)
    setMarked(clickedMark)
    setUsedId(clickedId)
    onSwipeLeft()
  }

  const handleDeleteNote = async (deleteId) => {
    await handleToast('Deleting the note ...', false)
    db.collection("notes").doc(deleteId).delete()
    .then( () => deleteId === usedId ? (Requestor(), Resetor(), handleToast('Deleting the note ...', true)) : Requestor(), handleToast('Deleting the note ...', true))
  }

  const handleToast = (text, reqState) => {
    setAction(text)
    setReqState(reqState)
    setTimeout(() => {
      setReqState(!reqState)
    }, 1000)
  }

  return (
      <ThemeProvider theme={theme}>
        {isLogged ? (
          <Swipe
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            tolerance={100}
          >
            <NotesContainer>
              <SwipeIndicator open={isSwiped} windowWidth={windowWidth}><FiChevronRight /></SwipeIndicator>
              <NoteNav
                data={data}
                onNoteClick={handleNoteClick}
                onDeleteClick={handleDeleteNote}
                reset={() => Resetor()}
                creationFilter={filterByCreaDate}
                updateFilter={filterByModifDate}
                markedFilter={filterByMarked}
                filterValue={filterIndicator}
                switchTheme={themeSwitcher}
                themeValue={isLight}
                swipe={isSwiped}
                windowWidth={windowWidth}
                logOut={logOut}
              />
              <NoteEditor
                onTitleChange={handleTitleChange}
                onNoteChange={handleNoteChange}
                onClickMark={handleMark}
                onClickSend={() => sendOrUpdate()}
                note={note}
                title={title}
                marked={marked}
                reqState={done}
                action={action}
              />
            </NotesContainer>
          </Swipe>
        ) : (
          <Login setIsLogged={setIsLogged}/>
        )}
      </ThemeProvider>
  )
}

export default MainApp
