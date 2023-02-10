import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import Game4Modael from "./Game4Modal";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import store, { GameState, changeGame, completeGame, getPreservedGameDataHandler, updateGameData } from "../../store";

function Game4() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const Playercnt = location.state.cnt;
  const img = ['img/game1/game1_1.png', 'img/game1/game1_2.png']
  const img1 = ['img/game1/heart1.gif', 'img/game1/heart2.gif', 'img/game1/heart3.gif', 'img/game1/heart4.gif']
  const img2 = ['img/game1/dance.gif', 'img/game1/dance_cute.gif', 'img/game1/monkey.gif']

  const game = useSelector((state)=>state.game);
  const dispatch = useDispatch();
  const game1 = game.gameData.playerData;
  const players = game.playerViewPos;
  const timePerTurn = game.gameData.timePerTurn;
  const [timeLeft, setTimeLeft] = useState(timePerTurn);

  useEffect(() => {
    if(game.gameState === GameState.PLAY && isLoading){
      
      dispatch(changeGame({data:{playerId: game.gameState.turn}}));
      
      let intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
      if (prevTime === 0) {
        dispatch(updateGameData(getPreservedGameDataHandler().onTurnChange(store.getState().game)));
        dispatch(changeGame({data:{playerId: game.gameState.turn}}));
        return timePerTurn;
      } else {
        return prevTime - 1;
      }});}, 1000);
      setIsLoading(false);
      // return () => clearInterval(intervalId);
    }
    }, [isLoading]);
  if (game.gameState !== GameState.PLAY) {
    return (<>게임 생성 중입니다. 기다려주세요...</>)
  } else {


  return (
  <>
  <Full>
  <Modal
    open={open}
    // onClose={handleClose}
  >
    <Game4Modael handleClose = {()=>{setIsLoading(true);handleClose()}} />
  </Modal>    
  <Side>
  <h1>{timeLeft}</h1>
  <progress value={timeLeft} max={timePerTurn} />
  {/* https://coreui.io/react/docs/components/progress/ */}
  {/* https://mui.com/material-ui/react-progress/ */}
  {/* https://freefrontend.com/react-progress-bars/ */}
  <Stack sx={{ width: '50%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Stack>
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>
      {/* https://coreui.io/react/docs/components/progress/ */}
      {/* https://mui.com/material-ui/react-progress/ */}
      {/* https://freefrontend.com/react-progress-bars/ */}
  </Side>
  <Display>
      {players.map(function (e, i) {
        return (
      
      <PlayerDisplay index={i}>
          {(i === game.gameData.turnIndex)?<>Turn</>:<></>}
      <Player>Player : {game1[i].playerId}</Player>
      {/* { game1[i].cnt >= 45 &&  */}
      {/* <IMG 
      src={img[game1[i].cnt%2]}></IMG> */}
      <STATE>
      <IMG 
      src={img1[i]}></IMG>
      {/* <IMG 
      src={img2[i%3]}></IMG> */}
      <CNT>{game1[i].db}</CNT>
      </STATE>
      {/* } */}
      </PlayerDisplay>
    )
    })}
  </Display>
  <Side>
    <Quit onClick={() => {dispatch(completeGame({}))} /* 비동기 통신이므로 여기에 navigate 를 달면 큰일난다. 방법1. complete callback을 달기 방법2. hook으로 game.gameState == 0 감지하기, 방법 3. hook으로 game.gameResult가 변경됨을 감지하기,  */     }>QUIT</Quit>
  </Side>
  </Full>
    </>
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
export default Game4