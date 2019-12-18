import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FiFilter } from "react-icons/fi"

const ButtonContainer = styled.div`
  padding: .8em .7em .2em;
  margin: 0 .2em;
  border-radius: 50px;
  color: ${props => props.active ? 'rgba(0,0,0, .4)' : 'rgba(0,0,0, .2)'};
  background-color: ${props => props.active && 'rgba(0,0,0,.05)'};
  cursor: pointer;
  transition: .3s;

  :hover {
    background-color: rgba(0,0,0,.05);
    color: rgba(0,0,0, .4);
  }
`

const PopupContainer = styled.div`
  width: 10em;
  max-height: 30%;
  position: absolute;
  bottom: 70px;
  left: 15.5%;
  box-shadow: 0px -1px 20px #ece7e7;
  background-color: white;
  font-weight: 400;
  border-radius: 12px;
  cursor: default;
  animation: ease ${props => props.show ? "show" : "hide"} .25s;

  @keyframes show {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes hide {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(8px);
  }
}

  .title {
    font-size: 0.8em;
    padding: .8em;
    color: rgba(0,0,0, .3);
    background-color: rgba(0,0,0, .02);
    ${'' /* border-bottom: 1px solid rgba(0,0,0, .06); */}
    border-radius: 12px 12px 0 0;
    letter-spacing: 1px;
  }

  .fonction {
    font-size: 0.65em;
    padding: 1em;
    color: rgba(0,0,0, .25);
    letter-spacing: 1px;
    border-bottom: 1px solid rgba(0,0,0, .04);
    cursor: pointer;
    transition: .3s;

    :hover {
      color: rgba(0,0,0, .4);
      background-color: rgba(0,0,0, .02);
    }

    :last-child {
      border-bottom: 0px;
      border-radius: 0px 0px 12px 12px;
    }
  }

`

const PopupBox = ({ filter, orderByCreation, orderByUpdate, orderByMarked }) => {

  const [ showFilter, setShowFilter ] = useState(false)
  const [ shouldRender, setRender ] = useState(showFilter)

  useEffect(() => {
    if (showFilter) setRender(true)
  }, [showFilter])

  const onAnimationEnd = () => {
    if (!showFilter) setRender(false)
  }

  return (
    <ButtonContainer active={showFilter} onClick={() => setShowFilter(showFilter => !showFilter)}>
      {filter && <FiFilter/>}
      {shouldRender && (
        <PopupContainer
          show={showFilter}
          onAnimationEnd={onAnimationEnd}
          >
            <div className="title">
              Order by :
            </div>
            <div className="fonction" onClick={orderByCreation}>
              Creation Date
            </div>
            <div className="fonction" onClick={orderByUpdate}>
              Update Date
            </div>
            <div className="fonction" onClick={orderByMarked}>
              Marked
            </div>
        </PopupContainer>
      )}
    </ButtonContainer>
  )
}

export default PopupBox
