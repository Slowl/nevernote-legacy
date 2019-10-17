import React from 'react'
import styled from 'styled-components'

const Title = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 3em;
  padding: .5em;
  font-size: 1.6em;
  font-family: 'Oswald', sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #2f2f2f;
  border: 0;
  border-bottom: 3px solid rgba(191, 50, 50, .3);
  transition: ease-in .2s;

  ::placeholder {
    color: rgba(191, 50, 50, .8);
  }

  :focus {
    border-bottom: 3px solid rgba(191, 50, 50, .6);
  }
`

const TitleInput = () => {
  return (
    <Title type="text" placeholder="write your title ..."/>
  )
}

export default TitleInput
