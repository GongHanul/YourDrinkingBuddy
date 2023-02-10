import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { /*changeGame3Data,*/ preserveGameDataHandler, createGame, setGameStatePlay, setGameDataHandler, GameState } from "../../store.js";


function Game3() {
  const location = useLocation();
  // const Playercnt = location.state.cnt
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(40);
  // useEffect( () => {setPlayer([...Array(Playercnt).keys()]) } ,[])
  // let [Player, setPlayer] = useState([])
  
  const game = useSelector((state)=>state.game);
  const game3 = game.gameData
  const players = game.playerViewPos;
  const img1 = ['img/game3/1-1.png', 'img/game3/1-2.png', 'img/game3/1-3.png']
  const img2 = ['img/game3/2-1.png', 'img/game3/2-2.png']
  const img3 = ['img/game3/3-1.png', 'img/game3/3-2.png']
  const img4 = ['img/game3/4-1.png', 'img/game3/4-2.png']

  

  // if (game.gameState !== GameState.PLAY) {
  //   return (<><TopDiv> 게임 생성 중입니다. 기다려주세요... </TopDiv></>)
  // } else {

  useEffect(() => {
  let intervalId = setInterval(() => {
  setTimeLeft((prevTime) => {
  if (prevTime === 0) {
    navigate("/game");
  } else {
    return prevTime - 1;
  }});}, 1000);
  return () => clearInterval(intervalId);}, []);

  return (
  <>
  <Full>
  <Side>
  <h1>{timeLeft}</h1>
  <progress value={timeLeft} max={40} />
  {/* https://coreui.io/react/docs/components/progress/ */}
  {/* https://mui.com/material-ui/react-progress/ */}
  {/* https://freefrontend.com/react-progress-bars/ */}
  </Side>
  <Display>
  { players.map(function(e, i){
    return (
      <PlayerDisplay index={i}>
      <Player>Player : {game3[i].playerId}</Player>
      <SCORE>{game3[i].cnt}</SCORE>
      { game.playerStatus.findIndex((e)=>e.playerId === game3[i].playerId) !== -1 && <IMG src="img/game3/connecting.gif"></IMG>}
      { game3[i].cnt < 15 &&<IMG 
      src={img1[game3[i].cnt%3]}></IMG>}
      { game3[i].cnt < 30 && game3[i].cnt >= 15 && <IMG 
 
 src={img2[game3[i].cnt%2]}></IMG>}
      { game3[i].cnt >= 30 && game3[i].cnt < 45 && <IMG 
  
  src={img3[game3[i].cnt%2]}></IMG>}
      { game3[i].cnt >= 45 && <IMG 
      src={img4[game3[i].cnt%2]}></IMG>}
    </PlayerDisplay>)
  })}
  </Display>
  </Full>
  </>
  )
}
const SCORE = styled.div`
  font-family: 'Silkscreen', cursive;
  font-size: 15vh;
  margin : -3vh 0 0 0 ;
`
const IMG = styled.img`
  justify-content: center;
  align-items: center ;
`
const Player = styled.div`
  display : flex;
`
const Full = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100vw;
  background : #ffecec;
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
const PlayerDisplay = styled.div`
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
  /* background-image: url(${'img/game3/game3_bg.gif'}); */
`
export default Game3