import styled from "styled-components";
import { React, useState, useEffect } from 'react';

function Game5() {
  let [Player, setPlayer] = useState([1])
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
  box-shadow: 0 0 4px #EDD582 inset;
  box-sizing: border-box;
  `
export default Game5