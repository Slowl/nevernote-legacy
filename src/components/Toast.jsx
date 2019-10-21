import React from 'react'
import styled from 'styled-components'
import { FiCheckCircle } from "react-icons/fi"

const ToastContainer =styled.div`
  position: relative;
  top: -97%;
  left: 39.5%;
  width: 14%;
  display: flex;
  justify-content: space-between;
  background-color: #8cf57f;
  color: #ffffff;
  border-radius: 30px;
  padding: .6em 1em;
  text-align: center;
  font-size: 1.2em;
  letter-spacing: 2px;
  box-shadow: rgba(0,0,0, .1) 0px 0px 20px 3px;
  transform: ${props => props.isDone ? 'translateY(0px)' : 'translateY(-70px)'};
  transition: .3s;
  svg {
    font-size: 1.2em;
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
