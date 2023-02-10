import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"


function Game2() {
  let [Player, setPlayer] = useState([1])
  return (
  <>
  <Full>
  <Display>
  { Player.map(function(e, i){
    return (<PlayerDisplay index={i}>{i}</PlayerDisplay>)
  })}
  </Display>
  <Side>
  <Restart>REPLAY<FontAwesomeIcon icon={faArrowRotateRight} /></Restart>
  </Side>
  </Full>
  </>
  )
}
const Full = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100vw;
`
const Display = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100%;
  height : 85%;
`
const Side = styled.div`
  display : flex;
  justify-content: space-evenly;
  padding : 2vh;
  width : 100%;
  height : 10%;
`
const PlayerDisplay = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
  flex: 1 1 50%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px #0E538B, 0 1px 2px #0E538B inset;
  box-sizing: border-box;
`
  const Restart = styled.div`
  display : flex;
  justify-content: center;
  align-items : center;
  color : #1966A5;
  font-size: 3vh;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  letter-spacing: 0.2vh;
  &:hover {
    color: red;
  }
`
export default Game2