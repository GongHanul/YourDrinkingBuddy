import styled from "styled-components";
import { React, useState, useLocation, useEffect } from 'react';

function Game1() {
  // const location = useLocation();
  // const Playercnt = location.state.cnt
  const Playercnt = 2
  useEffect( () => {setPlayer([...Array(Playercnt).keys()]) } )
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
  background : blue;
  border : black;
  background: #ffffff;
  box-shadow: 0 0 4px #063C69 inset;
  box-sizing: border-box;
`
export default Game1