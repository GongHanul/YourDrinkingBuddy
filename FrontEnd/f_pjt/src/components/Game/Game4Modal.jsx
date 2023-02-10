import styled from "styled-components";
import { React, useState, useEffect } from 'react';

import Box from '@mui/material/Box';

function Game4Modal(props) {
  const handleClose = props.handleClose
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    let intervalId = setInterval(() => {
    setTimeLeft((prevTime) => {
    if (prevTime === 0) {
      handleClose();
    } else {
      return prevTime - 1;
    }});}, 1000);
    return () => clearInterval(intervalId);}, []);

  return (
  <>
  <Box sx={style}>
    <Change1>소리 게임♬</Change1>
    <Change1>10초 후 게임이 시작됩니다.. {timeLeft}</Change1>
    <br/>
    <Change1>....</Change1>
  </Box>
  </>
  )
}

export default Game4Modal

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: '0 2px 4px, 0px 1px 2px inset',
  borderRadius: '2vh',
  padding : '4vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent : 'center',
  flexDirection: 'column',
};
const Change1 = styled.div`
  font-size: 5vh;
  font-family: 'Jua', sans-serif;
  filter: drop-shadow(0.2vh 0.2vh 0.1vh rgb(0 0 0 / 0.5));
`
const ClearBtn = styled.button`
  display: flex;
  background: #ffffff;
  font-family: 'Jua', sans-serif;
  border : none;
  border-radius : 1vh;
  color : #004680;
  font-weight : bold;
  font-style: normal;
  font-size: 4vh;
  &:hover {
    color: red;
  }
`
const State = styled.div`
  display: none;
`
