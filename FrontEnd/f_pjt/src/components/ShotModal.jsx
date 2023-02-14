import styled from "styled-components";
import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { CocktailMakerState } from './../store';
import { useSelector } from 'react-redux';

function ShotModal(props) {
  const cancel = props.cancel
  const handleClose = props.handleClose
  const cocktailMakerState = useSelector((state) => state.cocktailMaker);
  const [page, setPage] = useState(1)

  useEffect(()=>{
    if( cocktailMakerState.state === CocktailMakerState.IDLE ){
      handleClose()
    }
  })

  return (
  <>
  <Box sx={style}>
    {/* shot 눌렀을때 (page1) */}
 {page === 1  && <><State> 상태 : {cocktailMakerState.state}</State>
    <Loading>제 조 중 🍺</Loading>
    <Loading>가 마 니 이 써</Loading>
    <br />
    <StopBtn onClick={()=>{
      setPage(2)
      cancel()
    }} >SSSSSTOP</StopBtn>
    </>}
    {/* stop 눌렀을떄 (page2)*/}
    {page === 2 && <>
    <Loading>잔을</Loading>
    <Loading>비워주세요🥂</Loading>
    <br />
    <StopBtn onClick={handleClose} >CLOSE</StopBtn>   
    </>}
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
  width: '22vw',
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
  overflowY : 'auto',

};
const Loading = styled.div`
  font-size: 5vh;
  padding : 0 2vh;
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
