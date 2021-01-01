import React from 'react'
import styled from 'styled-components'
import { RiLoader5Line } from "react-icons/ri"

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
  transform: ${props => props.isDone ? 'translateY(10px)' : 'translateY(-75px)'};
  transition: .3s;
  svg {
    font-size: 1.2em;
    animation: ${props => props.isDone ? 'rotate .7s ease infinite' : ''};
    @keyframes rotate {
      100% { transform: rotate(360deg) }
    }
  }

  @media screen and (max-width: 45em) {
    width: 58%;
    left: 3%;
    transform: ${props => props.isDone ? 'translateY(0px)' : 'translateY(-75px)'};
    padding: .6em 1em;
    font-size: 1em;
    letter-spacing: 1px;
    z-index: 999;
 }
`

const Toast = ({ done, text }) => {
  return (
    <ToastContainer isDone={done}>
      {text} <RiLoader5Line />
    </ToastContainer>
  )
}

export default Toast
