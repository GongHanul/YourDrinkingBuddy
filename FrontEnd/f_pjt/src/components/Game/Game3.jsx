import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import store, { GameState, completeGame } from "../../store";
import { Modal } from "@mui/material";
import Game3Rank from "../Ranking/Game3Rank";
import Game3Modal from './Game3Modal';

const timeWait = 25;

function Game3() {
  const location = useLocation();
  // const Playercnt = location.state.cnt
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(timeWait);
  // useEffect( () => {setPlayer([...Array(Playercnt).keys()]) } ,[])
  // let [Player, setPlayer] = useState([])

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [isLoading, setIsLoading] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const dispatch = useDispatch();

  const clearUseState = () => {
    handleOpen();
    handleOpen2();
    setIsLoading(false);
    if(intervalId !== null){
      clearInterval(intervalId);
    }
    setIntervalId(null);
    setTimeLeft(timeWait);
  }
  
  const game = useSelector((state)=>state.game);
  const game3 = game.gameData
  const players = game.playerViewPos;
  const img1 = ['img/game3/1-1.png', 'img/game3/1-2.png', 'img/game3/1-3.png']
  const img2 = ['img/game3/2-1.png', 'img/game3/2-2.png']
  const img3 = ['img/game3/3-1.png', 'img/game3/3-2.png']
  const img4 = ['img/game3/4-1.png', 'img/game3/4-2.png']

  const bgcolor = [' #d0afd3', '#edf3bb', ' #f0eee9', '#f7cac1  ']
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

  useEffect(() => {
    if(game.gameState === GameState.PLAY && isLoading){
      setIntervalId(setInterval(() => {
        setTimeLeft((prevTime) => {
          let game = store.getState().game;
          if(game.gameState !== GameState.PLAY){
            return 0;
          }
          if (prevTime === 0) {
            console.log(`clear interval : ${intervalId}`)
            clearInterval(intervalId);
            dispatch(completeGame({}))
            setIsLoading(false);
            return 0;
          } else {
            return prevTime - 1;
          }});
        }, 1000)
      );
      setIsLoading(false);
      return () => clearInterval(intervalId);
    }
  }, [isLoading]);


  if (game.gameState !== GameState.PLAY) {
    if( game.gameState === GameState.IDLE && game.gameResult){
      return <Modal open={open2}>
        <Game3Rank 
          handleClose = {handleClose2}
          result = {game.gameResult}
          beforeRestart = {clearUseState}
        ></Game3Rank>
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
    <Game3Modal handleClose = {()=>{setIsLoading(true);handleClose()}} />
  </Modal>    
    <Side>
    <TimeLeft>{timeLeft}</TimeLeft>
    <progress value={timeLeft} max={25} />
    {/* https://coreui.io/react/docs/components/progress/ */}
    {/* https://mui.com/material-ui/react-progress/ */}
    {/* https://freefrontend.com/react-progress-bars/ */}
    </Side>
    <Display>
    { players.map(function(e, i){
      return (
        <PlayerDisplay index={i} style={{backgroundColor : `${bgcolor[i]}`}}>
        <Player>PLAYER {game3[i].playerId}</Player>
        { game.playerStatus.findIndex((e)=>e.playerId === game3[i].playerId) !== -1 && <IMG src="img/game3/connecting.gif"></IMG>}
        { game3[i].cnt < 16 &&<IMG 
        src={img1[game3[i].cnt%3]}></IMG>}
        { game3[i].cnt < 32 && game3[i].cnt >= 16 && <IMG 
  
        src={img2[game3[i].cnt%2]}></IMG>}
        { game3[i].cnt >= 32 && game3[i].cnt < 50 && <IMG 
    
        src={img3[game3[i].cnt%2]}></IMG>}
        { game3[i].cnt >= 50 && <IMG 
        src={img4[game3[i].cnt%2]}></IMG>}
        <SCORE>{game3[i].cnt}</SCORE>
      </PlayerDisplay>)
    })}
    </Display>
    </Full>
    </>
    )
  }
}
const TimeLeft = styled.div`
  padding : 0 5vh;
  font-weight: bold;
  font-family: 'Jua', sans-serif;
  filter: drop-shadow(0.2vh 0.2vh 0.1vh rgb(0 0 0 / 0.5));
`
const SCORE = styled.div`
  /* font-family: 'Silkscreen', cursive; */
  font-family: 'Shojumaru', cursive;
  /* font-family: 'Nabla', cursive; */
  font-size: 13vh;
  margin : -3vh 0 0 0 ;
`
const IMG = styled.img`
  justify-content: center;
  align-items: center ;
  height : 15vh;
`
const Player = styled.div`
  position: relative;
  font-size: 5vh;
  font-family: 'Jua', sans-serif;
  font-weight: bold;
`
const Full = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100vw;
  background :#f3dff5 ;
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
  font-size: 8vh;
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
  /* box-shadow: 0 1px 2px #1966A5, 0 1px 2px #1966A5 inset; */
  /* background-image: url(${'img/game3/game3_bg.gif'}); */
`
export default Game3