import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';

function Game3() {
  const navigate = useNavigate();
  const location = useLocation();
  const Playercnt = location.state.cnt
  useEffect( () => {setPlayer([...Array(Playercnt).keys()]) } ,[])
  let [Player, setPlayer] = useState([])
  
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
  let intervalId = setInterval(() => {
  setTimeLeft((prevTime) => {
  if (prevTime === 0) {
    navigate("/");
  } else {
    return prevTime - 1;
  }});}, 1000);
  return () => clearInterval(intervalId);}, []);

  return (
  <><TopDiv>
  { Player.map(function(e, i){
    return (
    <Display index={i}>
      <h1>{timeLeft}</h1>
      <progress value={timeLeft} max={20} />
    </Display>)
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
  box-shadow: 0 1px 2px #1966A5, 0 1px 2px #1966A5 inset;
  box-sizing: border-box;
  `
export default Game3