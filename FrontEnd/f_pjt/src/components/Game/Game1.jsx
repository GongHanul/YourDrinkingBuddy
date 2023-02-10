import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import Game1Modal from "./Game1Modal";
import { GameState, completeGame } from "../../store";
import Game1Rank from './../Ranking/Game1Rank';

function Game1() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const location = useLocation();
  const Playercnt = location.state.cnt;
  const img1 = ['img/game1/heart1.gif', 'img/game1/heart2.gif', 'img/game1/heart3.gif', 'img/game1/heart4.gif']
  const game = useSelector((state)=>state.game);
  const dispatch = useDispatch();
  const game1 = game.gameData;
  const players = game.playerViewPos;

  

  if (game.gameState !== GameState.PLAY) {
    if( game.gameState === GameState.IDLE && game.gameResult){
      return <Modal open={open2}>
        <Game1Rank 
          handleClose = {handleClose2}
          result = {game.gameResult}
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
          <PlayerDisplay index={i}>
          <Player>Player : {game1[i].playerId}</Player>

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
  font-family: 'Silkscreen', cursive;
  font-size: 20vh;
`

const STATE = styled.div`
  display : flex;
`

const Player = styled.div`
  display : flex;
`
const IMG = styled.img`
  justify-content: center;
  align-items: center ;
`

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
const Quit = styled.div`
  display : flex;
  justify-content: center;
  align-items : center;
  color : #1966A5;
  font-size: 3vh;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  letter-spacing: 0.3vh;
  &:hover {
    color: red;
  }
`
const PlayerDisplay = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px #063C69, 0 1px 2px #063C69 inset;
  box-sizing: border-box;
  /* background-image: url(${'img/game1/whale.gif'}); */
  background-color: grey;
`
export default Game1