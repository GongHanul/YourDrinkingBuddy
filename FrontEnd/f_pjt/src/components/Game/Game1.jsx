import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import Game1Modael from "./Game1Modal";

function Game1() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = useLocation();
  const Playercnt = location.state.cnt
  const img = ['img/game1/game1_1.png', 'img/game1/game1_2.png']
  const img1 = ['img/game1/heart1.gif', 'img/game1/heart2.gif', 'img/game1/heart3.gif', 'img/game1/heart4.gif']
  const img2 = ['img/game1/dance.gif', 'img/game1/dance_cute.gif', 'img/game1/monkey.gif']

  const game = useSelector((state)=>state.game);
  const game1 = game.gameData
  const players = game.playerViewPos;

  // if (game.gameState !== GameState.PLAY) {
  //   return (<><TopDiv> 게임 생성 중입니다. 기다려주세요... </TopDiv></>)
  // } else {
  return (
  <>
  <Full>
  <Modal
    open={open}
    // onClose={handleClose}
  >
    <Game1Modael handleClose = {handleClose} />
  </Modal>    

  <Display>
      {players.map(function (e, i) {
        return (
      <PlayerDisplay index={i}>
      <Player>Player : {game1[i].playerId}</Player>
      {/* { game1[i].cnt >= 45 &&  */}
      {/* <IMG 
      src={img[game1[i].cnt%2]}></IMG> */}
      <STATE>
      <IMG 
      src={img1[i]}></IMG>
      {/* <IMG 
      src={img2[i%3]}></IMG> */}
      <CNT>{game1[i].heartRate}</CNT>
      </STATE>
      {/* } */}
      </PlayerDisplay>
    )
    })}
  </Display>
  <Side>
    <Quit>QUIT</Quit>
  </Side>
  </Full>
    </>
    )
  // }
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