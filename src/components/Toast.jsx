import React from 'react'
import styled from 'styled-components'
import { FiCheckCircle } from "react-icons/fi"

const ToastContainer =styled.div`
  position: relative;
  top: -98%;
  left: 25.5%;
  width: 30%;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.white};
  border-radius: 30px;
  padding: .6em 1em;
  text-align: center;
  font-size: 1.2em;
  letter-spacing: 2px;
  box-shadow: ${props => props.theme.grey1} 0px 0px 20px 3px;
  transform: ${props => props.isDone ? 'translateY(5px)' : 'translateY(-75px)'};
  transition: .3s;
  svg {
    font-size: 1.2em;
  }

  @media screen and (max-width: 45em) {
    width: 58%;
    left: 3%;
    transform: ${props => props.isDone ? 'translateY(0px)' : 'translateY(-75px)'};
    padding: .6em 1em;
    font-size: 1em;
    letter-spacing: 1px;
 }
`

const Toast = ({ done, text }) => {
  return (
    <ToastContainer isDone={done}>
      {text} <FiCheckCircle />
    </ToastContainer>
  )
}

export default Toast
