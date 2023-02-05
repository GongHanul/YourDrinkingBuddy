import styled from "styled-components";
import { React, useState } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

function PlayerModal(props) {
  console.log(props)
  const navigate = useNavigate();
  const move = () => {
    navigate('/gameplay', { state: {id : props.gameid} });}
  return (
  <>
  <Box sx={style}>
  <GameStart onClick={move} >START!</GameStart>
  </Box>
  </>
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30vw',
  height: '50vh',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: '0 2px 4px, 0px 1px 2px inset',
  borderRadius: '2vh',
  padding : 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent : 'center',
  flexDirection: 'column',
};
const GameStart = styled.button`
  margin: 4vh 0 0 0 ;
  background: #ffffff;
  border : none;
  border-radius : 1vh;
  color : #1966A5;
  font-weight : bold;
  font-style: normal;
  font-size: 3vh;
  padding : 1vh 3vh 1vh 2.5vh;
  &:link {
    text-decoration: none;
  }
  &:hover {
    color: red;
  }
`
export default PlayerModal
