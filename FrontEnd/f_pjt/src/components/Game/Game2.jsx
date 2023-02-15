import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import Modal from '@mui/material/Modal';
import Game2Modal from "./Game2Modal";
import { useDispatch, useSelector } from 'react-redux';
import { GameState, completeGame, createGame, setGameDataHandler, setGameStateReady } from "../../store";
import { useNavigate } from 'react-router-dom';
import { destroyGame } from "../../store";


function Game2() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const img = ['img/game2/taleup.png', 'img/game2/taledown.png']
  const [view, setView] = useState(true)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const back = () => {
    dispatch(destroyGame());
    navigate('/game');}


  const game = useSelector((state)=> state.game);
  const game2 = game.gameData;

  useEffect(() => {
    setView(!view)
  }, [game2])

  const restart = () => {
    dispatch(setGameStateReady())
    dispatch(setGameDataHandler())
    dispatch(createGame({playerCount : 0}));
    handleOpen();
    navigate('/game2', { state: { cnt : game.playerViewPos.length } });
  }

  const endGame = () => {
    dispatch(completeGame({}))
  }
  const quit = () => {
    navigate('/game')
  }

  if(game.gameState === GameState.PLAY){
    if(game2.weight > game2.limit){
      return (
        <Full>
          <Display>
            {endGame()}
            DOOOOOOM ~~~~!@#&@#&@!&*$&!@$&*@^$&*@^$@$2138218392189
          </Display>
          <Side>
          {game.gameState === GameState.IDLE?
          <>
          <Restart onClick={restart}>REPLAY<FontAwesomeIcon icon={faArrowRotateRight} /></Restart>
          <Quit onClick={quit}>QUIT</Quit></>
          :
          <></>
          }
          </Side>
      </Full>
      )
    }else{
      return (
        <Full>
        <Modal
          open={open}
          // onClose={handleClose}
        >
          <Game2Modal handleClose = {handleClose} />
        </Modal>
        <Display>
          {/* 이미지 리터칭 , css */}
          <Weight>{game2.weight} ml</Weight>
          { view && <IMG src={img[0]}></IMG>}
          { !view && <IMG src={img[1]}></IMG>}
        </Display>
        <Side>
          <Restart onClick={back}><FontAwesomeIcon icon= {faArrowLeftLong}/> BACK</Restart>
          <Restart onClick={restart}>REPLAY<FontAwesomeIcon icon={faArrowRotateRight}/></Restart>
        </Side>
        </Full>
        )
    }
  }else{
    if(game2.weight > game2.limit){
      return (
        <Full>
          <Display>
            {/* 결과창 */}
            <GameOver>GAME OVER</GameOver>
            <Result src="img/game2/crying.png"></Result>
            <Limit>벌칙은 '{game2.limit}mL' !</Limit>
          </Display>
          <Side>
          <Restart onClick={restart}>REPLAY<FontAwesomeIcon icon={faArrowRotateRight} /></Restart>
          <Quit onClick={quit}>QUIT</Quit>
          </Side>
      </Full>
      )
    } else {
      return (
        <Full>
          <Display>
              잠시 대기해주세요.
          </Display>
      </Full>
      )
    }
  }
  
  

}
const GameOver = styled.div`
  display : flex;
  /* font-family: 'Silkscreen', cursive; */
  font-family: 'Hanalei Fill', cursive;
  /* font-family: 'Nabla', cursive; */
  font-size: 13vh;
`
const Limit = styled.div`
  display : flex;
  font-family: 'Jua', sans-serif;
  /* font-family: 'Silkscreen', cursive; */
  /* font-family: 'Nabla', cursive; */
  font-size: 8vh;
`
const Weight = styled.div`
  display : flex;
  /* font-family: 'Silkscreen', cursive; */
  font-family: 'Hanalei Fill', cursive;
  /* font-family: 'Nabla', cursive; */
  font-size: 13vh;
`
const IMG = styled.img`
  display : flex;
  justify-content: center;
  align-items: center ;
  height : 50vh;
  margin-top : 3vh;
`
const Result = styled.img`
  display : flex;
  justify-content: center;
  align-items: center ;
  height : 40vh;
  margin : 5vh 0;
`
const Full = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100vw;
  background :#edf0d0 ;
`
const Display = styled.div`
  display : flex;
  width : 100%;
  height : 85%;
  background :#eaf0b4 ;
  justify-content: center;
  align-items: center ;
  flex-direction: column;
  /* box-shadow: 0 1px 2px #0E538B, 0 1px 2px #0E538B inset; */
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
  flex-direction: column;
  /* box-shadow: 0 1px 2px #0E538B, 0 1px 2px #0E538B inset; */
`
  const Restart = styled.div`
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
const Quit = styled.div`
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
export default Game2