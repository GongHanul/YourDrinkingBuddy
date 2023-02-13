import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import Modal from '@mui/material/Modal';
import Game2Modal from "./Game2Modal";
import { useSelector } from 'react-redux';
import { GameState } from "../../store";


function Game2() {
  let [Player, setPlayer] = useState([1])
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const game = useSelector((state)=> state.game);

  const game1 = game.gameData;

  const restart = () => {
    
  }

  return (
  <Full>
  <Modal
    open={open}
    // onClose={handleClose}
  >
    <Game2Modal handleClose = {handleClose} />
  </Modal>
  <Display>
    {
      game1.weight > game1.limit && game.gameState === GameState.PLAY?
        <>
          DOOOOM

          limit 값은 {game1.limit} 이였습니다. 

          죄인은 사약을 들라.
        
        </>
      :
        <>

          weight : {game1.weight}
        
        </>
    }


  </Display>
  <Side>
  <Restart onClick={restart}>REPLAY<FontAwesomeIcon icon={faArrowRotateRight} /></Restart>
  </Side>
  </Full>
  )
}
const Full = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100vw;
  background :#edf0d0 ;
`
const Display = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100%;
  height : 85%;
  background :#eaf0b4 ;
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
  /* box-shadow: 0 1px 2px #0E538B, 0 1px 2px #0E538B inset; */
`
  const Restart = styled.div`
  display : flex;
  justify-content: center;
  align-items : center;
  color : #1966A5;
  font-size: 3vh;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  letter-spacing: 0.2vh;
  &:hover {
    color: red;
  }
`
export default Game2