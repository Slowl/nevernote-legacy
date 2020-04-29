import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FiFilter } from "react-icons/fi"

const ButtonContainer = styled.div`
  padding: .75em .7em .25em;
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

const PopupContainer = styled.div`
  width: 10em;
  max-height: 30%;
  position: absolute;
  bottom: 90px;
  right: 67%;
  border: ${props => `2px solid ${props.theme.lightCream}`};
  background-color: ${props => props.theme.white};
  font-weight: 300;
  border-radius: 12px;
  cursor: default;
  transition: all ease .4s;
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
    color: ${props => props.theme.grey3};
    background-color: ${props => props.theme.grey02};
    border-radius: 12px 12px 0 0;
    letter-spacing: 1px;
  }

  .fonction {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.65em;
    padding: 1em;
    color: ${props => props.theme.grey3};
    letter-spacing: 1px;
    border-bottom: 1px solid ${props => props.theme.grey04};
    cursor: pointer;
    transition: .3s;

    :hover {
      color: ${props => props.theme.grey4};
      background-color: ${props => props.theme.grey02};
    }

    :last-child {
      border-bottom: 0px;
      border-radius: 0px 0px 12px 12px;
    }
  }

  @media screen and (max-width: 45em) {
    width: 11em;
    max-height: 45%;
    bottom: 85px;
    right: 10px;
 }

`

const FilterIndicator = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 20px;
  background-color: ${props => props.theme.redFlash};
`

const PopupBox = ({ filter, orderByCreation, orderByUpdate, orderByMarked, filterValue }) => {

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
              Creation Date {filterValue === "CREATION" && <FilterIndicator />}
            </div>
            <div className="fonction" onClick={orderByUpdate}>
              Update Date {filterValue === "UPDATE" && <FilterIndicator />}
            </div>
            <div className="fonction" onClick={orderByMarked}>
              Marked  {filterValue === "MARKED" && <FilterIndicator />}
            </div>
        </PopupContainer>
      )}
    </ButtonContainer>
  )
}

export default PopupBox
