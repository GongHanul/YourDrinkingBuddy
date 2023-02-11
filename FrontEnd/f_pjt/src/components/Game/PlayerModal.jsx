import styled from "styled-components";
import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faCircleLeft, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"


function PlayerModal(props) {
  console.log(props)
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(1);
  console.log(playerCount)

  const move = () => {
    navigate('/gameplay', { state: {id : props.gameid, cnt : playerCount} });}
  
  const handleIncrement = () => {
    if (playerCount < 4) {
      setPlayerCount(playerCount + 1);
    }
  };
  const handleDecrement = () => {
    if (playerCount > 1) {
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
    <Back><FontAwesomeIcon onClick={props.handleClose} icon= {faArrowLeft}/></Back>
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
  background : '#f0eee9',
  // background: 'linear-gradient(45deg, #5674BD, #F0F2F0)',
  color : '#1b1b1b',
  // background : '#d2dbf3',
};
const Top = styled.div` 
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  font-size: 5vh;
  letter-spacing: 0.5vh;
  margin : auto;
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
  border-radius : 100vh;
  padding: 0.5vh 3vh ;
  width : 3vw;
  display: flex;
  justify-content : center;
  filter: drop-shadow(0.4vh 0.4vh 0.1vh rgb(0 0 0 / 0.5));
`
const Back = styled.div`
  position: relative;
  left : -5vh;
  bottom : -2vh;
  font-size: 5vh;
  color : #4b76c0;
  /* filter: drop-shadow(0.4vh 0.4vh 0.1vh rgb(0 0 0 / 0.5)); */
  &:hover {
    color: #FAE59C;
    filter: drop-shadow(0.4vh 0.4vh 0.1vh rgb(0 0 0 / 0.6));
  }
`
const GameStart = styled.div`
  position: relative;
  left : -1vh;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  font-size: 4vh;
  letter-spacing: 0.5vh;
  color : #4b76c0;
  &:hover {
    color: #FAE59C;
    filter: drop-shadow(0.4vh 0.4vh 0.1vh rgb(0 0 0 / 0.6));
  }
`
export default PlayerModal
