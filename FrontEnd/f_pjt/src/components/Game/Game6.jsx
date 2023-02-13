import styled from "styled-components";
import { React, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import confetti from "canvas-confetti";
import { useSelector } from "react-redux";

function Game6() {
  const bgcolor = [' #c3ddd6', '#bfc7d6', ' #f0eee9', '#b8c0be']
  const shuffle = (array) => {
    for(let index = array.length -1 ; index > 0; index--){
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index +1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] = temporary;
    }
    return array
  }
  shuffle(bgcolor)

  const location = useLocation();
  const Playercnt = location.state.cnt
  useEffect( () => {setPlayer([...Array(Playercnt).keys()]) } ,[])
  let [Player, setPlayer] = useState([])
  let [initialRender, setInitialRender] = useState(false);

  

  const game = useSelector((state) => state.game)
  const game1 = game.gameData;

  const Effect = useCallback(() => {
    confetti({
      particleCount: 500,
      spread: 100
    });
  }, []);

  useEffect(()=>{
    if(initialRender){
      Effect();
    }else{
      setInitialRender(true)
    }
  },[game1.lastClickedPlayerIdx])

  

  return (
  <>
  <Full>
  <Display>
  { Player.map(function(e, i){
    return (<PlayerDisplay index={i} style={{backgroundColor : `${bgcolor[i]}`}}>
      <Click onClick={Effect}>🎉</Click>
    </PlayerDisplay>)
  })}
  </Display>
  <Side>
  <End>END</End>
  </Side>
  </Full>
  </>
  )
}

const Click = styled.button`
  background-color: #f0e9e9;
  color: #fff;
  border: none;
  font-size: 5ch;
  font-weight: 400;
  padding: 3vh 6vh;
  border-radius: 3vh;
  z-index: 999;
  display: flex;
  gap: 0.5em;
  box-shadow:
    0px 1.7px 2.2px rgba(0, 0, 0, 0.02),
    0px 4px 5.3px rgba(0, 0, 0, 0.028),
    0px 7.5px 10px rgba(0, 0, 0, 0.035),
    0px 13.4px 17.9px rgba(0, 0, 0, 0.042),
    0px 25.1px 33.4px rgba(0, 0, 0, 0.05),
    0px 60px 80px rgba(0, 0, 0, 0.07);
`
const Full = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100vw;
  background :#e4e9f5 ;
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
  width : 100%;
  height : 15%;
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
  /* box-shadow: 0 1px 2px #D0BB70 , 0 1px 2px #D0BB70 inset; */
  `
const End = styled.div`
  display : flex;
  justify-content: center;
  align-items : center;
  color : #1966A5;
  font-size: 5vh;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  letter-spacing: 0.3vh;
  &:hover {
    color: red;
}
`
export default Game6