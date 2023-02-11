import styled from "styled-components";
import { React, useState, useEffect } from 'react';

import Box from '@mui/material/Box';

function Game3Modal(props) {
  const handleClose = props.handleClose2
  const [timeLeft, setTimeLeft] = useState(3);

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
  <Change1>컨트롤러 게임 🎮</Change1>
  <Change1>{timeLeft}5초 후 게임이 시작됩니다🎉</Change1><br />
  </Box>
  </>
  )
}

export default Game3Modal

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
