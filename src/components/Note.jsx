import React from 'react'
import styled from 'styled-components'
import { FiX } from "react-icons/fi"
import ReactHtmlParser from 'react-html-parser';

const NoteContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  min-width: 90%;
  max-width: 90%;
  margin: 1em auto;
  border-radius: 0 5px 5px 0;
  border-left: ${props => props.isMarked ? `1px solid ${props.theme.red}` : `1px solid ${props.theme.grey3}`};
  display:flex;
  justify-content: space-between;

  cursor: pointer;
  transition: .15s;

  :hover {
    transform: translateX(2px);
  }

`

const ContentContainer = styled.div`
  padding: .5em;
  width: 18vw;
  min-width: 18vw;
  max-width: 18vw;
  height: auto;
  max-height: 7.2em;
  .title {
    padding-left: .3em;
    font-weight: 500;
    font-size: 1.3em;
    word-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.grey7};
    transition: all ease .4s;
  }

  .content {
    padding-left: .3em;
    font-weight: 400;
    font-size: 1.1em;
    letter-spacing: 1px;
    word-spacing: 1px;
    overflow: hidden;
    color: ${props => props.theme.grey4};
    position: relative;
    max-height: 5em;
    min-height: 5em;
    height: 5em;
    transition: all ease .4s;
      :after {
        content: "";
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 40%;
        height: 20px;
        transition: all ease .4s;
        ${'' /* background: linear-gradient(to right, ${props => props.theme.white3}, ${props => props.theme.cream} 50%); */}
      }
    }
  }

  @media screen and (max-width: 45em) {
    width: 70vw;
    min-width: 70vw;
    max-width: 70vw;

    .title {
      font-size: 1.2em;
    }

    .content {
      letter-spacing: 0px;
    }
 }
`

const Delete = styled.div`
  background-color: ${props => props.theme.salmon};
  color: ${props => props.theme.white};
  border-radius: 0 5px 5px 0;
  padding: 2.1em .3em;
  font-size: 1.5em;
  opacity: 0;
  transform: translateX(-3px);
  transition: .3s;

  :hover {
    background-color: ${props => props.theme.redLight};
  }

  ${NoteContainer}:hover & {
    transform: translateX(3px);
    opacity: 1;
  }
`

const Note = ({ title, note, marked, onClick, eximo }) => {
  return (
    <NoteContainer isMarked={marked}>
      <ContentContainer onClick={onClick}>
        <div className="title">
          {title}
        </div>
        <div className="content">
          {ReactHtmlParser(note)}
        </div>
      </ContentContainer>

      <Delete onClick={eximo}><FiX /></Delete>
    </NoteContainer>
  )
}

export default Note
