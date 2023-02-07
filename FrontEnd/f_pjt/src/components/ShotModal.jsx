import styled from "styled-components";
import { React, useEffect } from 'react';
import Box from '@mui/material/Box';
import { CocktailMakerState } from './../store';
import { useSelector } from 'react-redux';
import store from '../store'

function ShotModal(props) {
  const cancel = props.cancel
  const handleClose = props.handleClose
  const cocktailMakerState = useSelector((state) => state.cocktailMaker);

  useEffect(()=>{
    if( cocktailMakerState === CocktailMakerState.IDLE ){
      handleClose()
    }
  })

  return (
  <>
  <Box sx={style}>
    <State> 상태 : {cocktailMakerState}</State>
    <Loading>제 조 중 🍺</Loading>
    <Loading>가 마 니 이 써</Loading>
    <br />
    <StopBtn onClick={()=>{
      cancel()
    }} >SSSSSTOP</StopBtn>
  </Box>
  </>
  )
}

export default ShotModal

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20vw',
  height: '30vh',
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
const Loading = styled.div`
  font-size: 5vh;
  font-family: 'Jua', sans-serif;
  filter: drop-shadow(0.2vh 0.2vh 0.1vh rgb(0 0 0 / 0.5));
`
const StopBtn = styled.button`
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