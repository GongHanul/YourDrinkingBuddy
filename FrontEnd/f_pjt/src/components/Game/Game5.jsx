import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Game5Rank from "../Ranking/Game5Rank";

function Game5() {
  let [Player, setPlayer] = useState([1])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
  <>
  <Full>
  <Display>
  { Player.map(function(e, i){
    return (<PlayerDisplay index={i}>{i}</PlayerDisplay>)
  })}
  </Display>
  <Side>
  <End onClick={handleOpen}>END</End>
  <Modal
    open={open}>
    <Game5Rank Rank handleClose = {handleClose}/>
    </Modal>
  </Side>
  </Full>
  </>
  )
}
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
const PlayerDisplay = styled.div`
  display : flex;
  justify-content: center;
  align-items: center ;
  flex: 1 1 50%;
  align-items: center ;
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px #EDD582 , 0 1px 2px #EDD582 inset;
  box-sizing: border-box;
`
const End = styled.div`
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
export default Game5