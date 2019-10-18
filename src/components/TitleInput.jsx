import React from 'react'
import styled from 'styled-components'

const TitleContainer = styled.div`
  display: flex;
`

const Title = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 1.5em 1em 0em 1em;
  font-size: 1.6em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(0,0,0, .8);
  border: 0;
  transition: ease-in .2s;
`

const Picker = styled.div`
  display: flex;
  padding-top: 1.4em;
  padding-right: 1.5em;
`

const DarkMark = styled.div`
    width: 35px;
    height: 35px;
    margin: .25em;
    border-radius: 30px;
    background-color: #555555;
    box-sizing: border-box;
    border: ${props => props.isSelected ? '0px solid rgba(255,255,255, .6);' : '4px solid rgba(255,255,255, .6);'};
    cursor: pointer;
    transition: linear .15s;

    :hover {
      border: 4px solid rgba(255,255,255, .6);
    }
`

const RedMark = styled.div`
    width: 35px;
    height: 35px;
    margin: .25em;
    border-radius: 30px;
    background-color: #ed6868 ;
    box-sizing: border-box;
    border: ${props => props.isSelected ? '4px solid rgba(255,255,255, .6)' : '0px solid rgba(255,255,255, .6)'};
    cursor: pointer;
    transition: linear .15s;

    :hover {
      border: 4px solid rgba(255,255,255, .6);
    }
`

const TitleInput = ({ onChange, onClick, value, selected }) => {
  return (
    <TitleContainer>
      <Title type="text" placeholder="write your title ..." onChange={onChange} value={value} />
      <Picker>
        <DarkMark onClick={() => onClick(false)} isSelected={selected} />
        <RedMark  onClick={() => onClick(true)} isSelected={selected} />
      </Picker>
    </TitleContainer>
  )
}

export default TitleInput
