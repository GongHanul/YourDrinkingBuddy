import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Game1() {
  const location = useLocation();
  const Playercnt = location.state.cnt
  useEffect( () => {setPlayer([...Array(Playercnt).keys()]) } ,[])
  let [Player, setPlayer] = useState([])
  return (
  <><TopDiv>
  { Player.map(function(e, i){
    return (<Display index={i}>{i}</Display>)
  })}
  </TopDiv>
  </>
  )
}
const TopDiv = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100%
`
const Display = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
  flex: 1 1 50%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px #063C69 inset;
  box-sizing: border-box;
`
export default Game1