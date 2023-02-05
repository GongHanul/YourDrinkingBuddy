import styled from "styled-components";
import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faCircleLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"


function PlayerModal(props) {
  console.log(props)
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(0);
  console.log(playerCount)
  const move = () => {
    navigate('/gameplay', { state: {id : props.gameid, cnt : playerCount} });}
  
  const handleIncrement = () => {
    if (playerCount < 4) {
      setPlayerCount(playerCount + 1);
    }
  };
  const handleDecrement = () => {
    if (playerCount > 0) {
      setPlayerCount(playerCount - 1);
    }
  };
  return (
  <>
  <Box sx={style}>
    <Top>PLAYER?</Top>
    <Mid>
    <PlusMinus>
      <FontAwesomeIcon onClick={handleDecrement} icon= {faMinus}/>
    </PlusMinus>
      <PlayerCnt>{playerCount}</PlayerCnt>
    <PlusMinus>
      <FontAwesomeIcon onClick={handleIncrement} icon= {faPlus}/>
    </PlusMinus>
    </Mid>
    <Btm>
    <Back><FontAwesomeIcon onClick={props.handleClose} icon= {faCircleLeft}/></Back>
    <GameStart onClick={move}>START<FontAwesomeIcon icon= {faArrowRight}/></GameStart>
    </Btm>
  </Box>
  </>
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vh',
  height: '40vh',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: '0 2px 4px, 0px 1px 2px inset',
  borderRadius: '2vh',
  padding : 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent : 'center',
  flexDirection: 'column',
  background : '#d2dbf3',
};
const Top = styled.div` 
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  font-size: 5vh;
  letter-spacing: 0.5vh;
  margin : auto;
  filter: drop-shadow(0.4vh 0.4vh 0.1vh rgb(0 0 0 / 0.5));
`
const Mid = styled.div`
  display: flex;
  flex-direction: row; 
  margin : -1vh;
`
const Btm = styled.div` 
  display: flex;
  margin : auto;
`
const PlusMinus = styled.div`
  font-size: 7vh;
  margin: 0 4vh;
  filter: drop-shadow(0.4vh 0.4vh 0.1vh rgb(0 0 0 / 0.5));
`
const PlayerCnt = styled.div`
  margin: auto;
  font-family: 'Do Hyeon', sans-serif;
  font-weight : bold;
  font-size: 8vh;
  /* box-shadow: 0 1px 2px #474747 , 0px 1px 2px inset #474747 ; */
  border-radius : 100vh;
  padding: 0.5vh 3vh ;
  width : 3vw;
  display: flex;
  justify-content : center;
  filter: drop-shadow(0.4vh 0.4vh 0.1vh rgb(0 0 0 / 0.5));
`
const Back = styled.div`
  position: relative;
  left : -6vh;
  bottom : -3.5vh;
  font-size: 5vh;
  color : #ffffff;
  filter: drop-shadow(0.4vh 0.4vh 0.1vh rgb(0 0 0 / 0.5));
  &:hover {
    color: #004680;
  }
`
const GameStart = styled.button`
  background: none;
  position: relative;
  top : -1vh;
  left : -1vh;
  color : #000000;
  border : none;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  font-size: 4vh;
  letter-spacing: 0.5vh;
  filter: drop-shadow(0.3vh 0.3vh 0.1vh rgb(0 0 0 / 0.5));
  &:link {
    text-decoration: none;
  }
  &:hover {
    color: #004680;
  }
`
export default PlayerModal
