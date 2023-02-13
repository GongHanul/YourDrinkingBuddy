import styled from "styled-components";
import { React, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import confetti from "canvas-confetti";
import { useDispatch, useSelector } from "react-redux";
import { GameState, completeGame } from "../../store";
import Game6Rank from './../Ranking/Game6Rank';
import { Modal } from "@mui/material";
import Game6Modal from './Game6Modal';

function Game6() {

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const clearUseState = () => {
    setOpen(true);
    setOpen2(true);
  }



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

  const limitWaitTime = 23000 // 20초 기달려도 안 누르면 강제 종료

  const dispatch = useDispatch();

  const Effect = useCallback(() => {
    confetti({
      particleCount: 500,
      spread: 100
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if(game.gameState === GameState.PLAY){
        dispatch(completeGame({}))
      }
    }, limitWaitTime)
  }, [])

  useEffect(() => {
    if(game.gameState === GameState.PLAY && game1.clickedPlayerCnt === game1.playerData.length){
      dispatch(completeGame({}))
    }
  }, [game1.clickedPlayerCnt])

  useEffect(()=>{
    if(initialRender){
      Effect();
    }else{
      setInitialRender(true)
    }
  },[game1.lastClickedPlayerIdx])

  
  if (game.gameState !== GameState.PLAY) {
    if( game.gameState === GameState.IDLE && game.gameResult){
      return <Modal open={open2}>
        <Game6Rank
          handleClose = {handleClose2}
          result = {game.gameResult}
          beforeRestart = {clearUseState}
        ></Game6Rank>
      </Modal>
    } else {
      return (<>게임 생성 중입니다. 기다려주세요...</>)
    }
  } else {
  return (
    <>
    <Full>
    <Modal
        open={open}
        // onClose={handleClose}
      >
        <Game6Modal handleClose = {handleClose} />
      </Modal>    
    <Display>
    { Player.map(function(e, i){
      return (<PlayerDisplay index={i} style={{backgroundColor : `${bgcolor[i]}`}}>
        <Click onClick={Effect}>🎉</Click>
      </PlayerDisplay>)
    })}
    </Display>
    </Full>
    </>
    )
  } 
}

const Click = styled.div`
  background-color: none;
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
  height : 100%;
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
export default Game6