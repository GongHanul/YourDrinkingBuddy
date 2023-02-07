import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

function Game3() {
  const navigate = useNavigate();
  const location = useLocation();
  const Playercnt = location.state.cnt
  useEffect( () => {setPlayer([...Array(Playercnt).keys()]) } ,[])
  let [Player, setPlayer] = useState([])
  
  const [timeLeft, setTimeLeft] = useState(20);

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
  <><TopDiv>
  { Player.map(function(e, i){
    return (
    <Display index={i}>
      <h1>{timeLeft}</h1>
      <progress value={timeLeft} max={20} />
      {/* https://coreui.io/react/docs/components/progress/ */}
      {/* https://mui.com/material-ui/react-progress/ */}
      {/* https://freefrontend.com/react-progress-bars/ */}
      <Stack sx={{ width: '50%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Stack>
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>
    </Display>)
  })}
  </TopDiv>
  </>
  )
}
  const TopDiv = styled.div`
  display : flex;
  flex-wrap: wrap;
  width : 100%
  `
  const Display = styled.div`
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
  `
export default Game3