import styled from "styled-components";
import { React, useState, useEffect } from 'react';

function GameReady(props) {
  useEffect(() => {setPlayer([...Array(props.cnt).keys()])} ,[])
  let [Player, setPlayer] = useState([])
  console.log(11111111111)
  console.log(props.cnt)
  // setPlayer([...Array(playercount).keys()])
  return (
  <><TopDiv>
  { Player.map(function(e, i){
    return (<Setting index={i}>{i}</Setting>)
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
const Setting = styled.div`
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
box-shadow: 0 0 4px #474747 inset;
box-sizing: border-box;
`
export default GameReady