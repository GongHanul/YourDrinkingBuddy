import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function GamePlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id
  const Playercnt = location.state.cnt
  const GameId = `/game${id}`

  const start = () => {
  navigate(GameId, { state: { cnt : Playercnt} });}
  
  useEffect(() => {setPlayer([...Array(Playercnt).keys()])} ,[])
  let [Player, setPlayer] = useState([])
  console.log(GameId)
  console.log(Playercnt)
  return (
  <>
  <Display>
  { Player.map(function(e, i){
    return (
    <Ready index={i}>
      {i}
    </Ready>)
  })}
  </Display>
  <Start onClick={start}>START!</Start>
  </>
  )
}
const Display = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100%;
`
const Ready = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
  flex: 1 1 50%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px #474747 inset;
  box-sizing: border-box;
`
const Start = styled.div`
  display : grid;
  align-items : center;
  background: #ffffff;
  border : none;
  border-radius : 1vh;
  color : #1966A5;
  font-weight : bold;
  font-style: normal;
  font-size: 3vh;
  padding : 1vh 3vh 1vh 2.5vh;
  &:link {
    text-decoration: none;
  }
  &:hover {
    color: red;
  }
`
export default GamePlay