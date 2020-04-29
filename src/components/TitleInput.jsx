import React from 'react'
import styled from 'styled-components'

const TitleContainer = styled.div`
  display: flex;
`

const Title = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: .5em 1em;
  font-size: 1.2em;
  font-family: 'Hind Madurai', sans-serif;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${props => props.theme.grey8};
  background-color: ${props => props.theme.white};
  border: 0;
  transition: all ease .4s;

  :focus {
    outline: 0;
  }

  ::placeholder {
    color: ${props => props.theme.placeholder};
    opacity: 1;
  }

  @media screen and (max-width: 45em) {
    width: calc(100% - (110px - 1em));
    font-size: 1.35em;
    letter-spacing: 0px;
 }
`

const Picker = styled.div`
  display: flex;
  padding-top: 1.4em;
  padding-right: 1.5em;

  @media screen and (max-width: 45em) {
    flex-direction: row;
    padding-top: .5em;
    padding-right: .5em;
 }
`

const DarkMark = styled.div`
    width: 35px;
    height: 35px;
    margin: .25em;
    border-radius: 30px;
    background-color: ${props => props.theme.grey};
    box-sizing: border-box;
    border: ${props => props.isSelected ? `0px solid ${props.theme.white6};` : `4px solid ${props.theme.white6};`};
    cursor: pointer;
    transition:  .15s;

    :hover {
      border: 4px solid ${props => props.theme.white6};
    }
`

const RedMark = styled.div`
    width: 35px;
    height: 35px;
    margin: .25em;
    border-radius: 30px;
    background-color: ${props => props.theme.redFlash} ;
    box-sizing: border-box;
    border: ${props => props.isSelected ? `4px solid ${props.theme.white6}` : `0px solid ${props.theme.white6}`};
    cursor: pointer;
    transition:  .15s;

    :hover {
      border: 4px solid ${props => props.theme.white6};
    }
`

const TitleInput = ({ onChange, onClick, value, selected }) => {
  return (
    <TitleContainer>
      <Title type="text" placeholder="write your title ..." onChange={onChange} value={value} maxLength={30} />
      <Picker>
        <DarkMark onClick={() => onClick(false)} isSelected={selected} />
        <RedMark  onClick={() => onClick(true)} isSelected={selected} />
      </Picker>
    </TitleContainer>
  )
}

export default TitleInput
