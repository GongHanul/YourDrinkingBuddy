import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GameState, completeGame } from "../../store";
import Modal from '@mui/material/Modal';
import Game1Modal from "./Game1Modal";
import Game1Rank from './../Ranking/Game1Rank';

function Game1() {
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

  const location = useLocation();
  const Playercnt = location.state.cnt;
  const img1 = ['img/game1/heart1.gif', 'img/game1/heart2.gif', 'img/game1/heart3.gif', 'img/game1/heart4.gif']
  const game = useSelector((state)=>state.game);
  const dispatch = useDispatch();
  const game1 = game.gameData;
  const players = game.playerViewPos;

  const bgcolor = [' #c3ddd6', '#a8b0ae', ' #bfc7d6', '#d0e1ff']
  const shuffle = (array) => {
    for(let index = array.length -1 ; index > 0; index--){
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index +1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] =temporary;
    }
    return array
  }
  shuffle(bgcolor)

  if (game.gameState !== GameState.PLAY) {
    if( game.gameState === GameState.IDLE && game.gameResult){
      return <Modal open={open2}>
        <Game1Rank 
          handleClose = {handleClose2}
          result = {game.gameResult}
          beforeRestart = {clearUseState}
        ></Game1Rank>
      </Modal>
    } else {
      return (<>게임 생성 중입니다. 기다려주세요...</>)
    }
  } else {
    return (
      <Full>
      <Modal
        open={open}
        // onClose={handleClose}
      >
        <Game1Modal handleClose = {handleClose} />
      </Modal>    

      <Display>
          {players.map(function (e, i) {
            return (
          <PlayerDisplay index={i} style={{backgroundColor : `${bgcolor[i]}`}}>
          <Player>PLAYER {game1[i].playerId}</Player>

          <STATE>
          { game1[i].bpm < 70 && <IMG 
          src={img1[0]}></IMG>}
          { game1[i].bpm >= 70 && game1[i].bpm < 90 && <IMG 
          src={img1[1]}></IMG>}
          { game1[i].bpm >= 90 && game1[i].bpm <110 && <IMG 
          src={img1[2]}></IMG>}
          { game1[i].bpm >= 110 && <IMG 
          src={img1[3]}></IMG>}
          <CNT>{game1[i].bpm}</CNT>
          </STATE>
          </PlayerDisplay>
        )
        })}
      </Display>
      <Side>
        <Quit onClick={() => {dispatch(completeGame({}))} /* 비동기 통신이므로 여기에 navigate 를 달면 큰일난다. 방법1. complete callback을 달기 방법2. hook으로 game.gameState == 0 감지하기, 방법 3. hook으로 game.gameResult가 변경됨을 감지하기,  */     }>QUIT</Quit>
      </Side>
      </Full>
      )
  }
}
const CNT = styled.div`
  /* font-family: 'Silkscreen', cursive; */
  /* font-family: 'Changa', sans-serif; */
  /* font-family: 'Hanalei Fill', cursive; */
  /* font-family: 'Nabla', cursive; */
  font-family: 'Orbitron', sans-serif;
  /* font-family: 'Shojumaru', cursive; */
  /* font-family: 'Silkscreen', cursive; */
  font-size: 12vh;
`
const STATE = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
`
const Player = styled.div`
  position: relative;
  top : -6vh;
  font-size: 5vh;
  font-family: 'Jua', sans-serif;
  font-weight: bold;
`
const IMG = styled.img`
  display : flex;
  height : 15vh;
  padding : 2vh 5vh;
`

const Full = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100vw;
  background :#e9f3f0 ;
`
const Display = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100%;
  height : 85%;
`
const Side = styled.div`
  display : flex;
  width : 100%;
  height : 15%;
  justify-content: center;
  align-items: center ;
`
const Quit = styled.div`
  display : flex;
  justify-content: center;
  align-items : center;
  color : #004680;
  font-size: 5vh;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  letter-spacing: 0.3vh;
  &:hover {
    color: #da341f;
  }
`
const PlayerDisplay = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  /* box-shadow: 0 1px 2px #063C69, 0 1px 2px #063C69 inset; */
  box-sizing: border-box;
  /* background-image: url(${'img/game1/whale.gif'}); */
  background-color: grey;
`
export default Game1