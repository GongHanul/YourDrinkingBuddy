import styled from "styled-components";
import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"


function Game3Rank() {
  const navigate = useNavigate();
  const quit = () => {
      navigate('/game');
    }
  return (
  <>
  <Box sx={style}>
    <Topdiv>
      <Rank>🏆RANK🏆</Rank><br />
      <Score>Player1 : cnt</Score>
      <Score>Player2 : cnt</Score>
      <Score>Player3 : cnt</Score>
      <Score>Player4 : cnt</Score>
    </Topdiv>
    <Bomdiv>
    <br /><Quit>REPLAY<FontAwesomeIcon icon={faArrowRotateRight} /></Quit>
    <Quit onClick={quit}>QUIT</Quit>
    </Bomdiv>
  </Box>
  </>
  )
}
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
const Topdiv = styled.div`
  display : flex;
  flex-direction: column;
  align-items: center ;
  justify-content: center;
  margin: 3vh;
`
const Bomdiv = styled.div`
  display : flex;
  justify-content: space-evenly;
  align-items: center ;
  justify-content: center;
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
  margin: 3vh;
  &:hover {
    color: red;
  }
`
const Rank = styled.div`
  font-size: 7vh;
  font-family: 'Jua', sans-serif;
  letter-spacing : 1vh;
  filter: drop-shadow(0.2vh 0.2vh 0.1vh rgb(0 0 0 / 0.5));
`
const Score = styled.div`
  font-size: 5vh;
  font-family: 'Jua', sans-serif;
  letter-spacing : 0.5vh;
  filter: drop-shadow(0.2vh 0.2vh 0.1vh rgb(0 0 0 / 0.5));
`
export default Game3Rank
