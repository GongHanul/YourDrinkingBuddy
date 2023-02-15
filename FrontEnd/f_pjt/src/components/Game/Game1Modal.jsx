import styled from "styled-components";
import { React, useState, useEffect } from 'react';

import Box from '@mui/material/Box';

function Game1Modal(props) {
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
    <Change1>심전도 게임💖</Change1>
    <Change1>{timeLeft}초 후 게임이 시작됩니다🎉</Change1>
    <br/>
    <Change1>주의사항💢</Change1>
    <Change2>1. 손가락을 그림과 같이 센서에 붙여주세요.</Change2>
    <Change2>[너무 약한 힘이거나 센 힘으로 누르면 </Change2>
    <Change2>측정이 잘 안될 수 있습니다.]</Change2>
    <Change2>2. 게임을 진행하는 동안</Change2>
    <Change2>한 자세를 유지해주시면</Change2>
    <Change2>더 정확한 심박수를 알 수 있습니다.</Change2>
  </Box>
  </>
  )
}

export default Game1Modal

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
const Change2 = styled.div`
  font-size: 4vh;
  font-family: 'Jua', sans-serif;
  filter: drop-shadow(0.2vh 0.2vh 0.1vh rgb(0 0 0 / 0.5));
`
