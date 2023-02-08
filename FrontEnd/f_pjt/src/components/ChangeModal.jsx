import styled from "styled-components";
import { React, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

function ChangeModal(props) {
  const handleClose = props.handleClose2
  return (
  <>
  <Box sx={style}>
    <Change1>교 체 중 🍺</Change1>
    <Change1>1. 술을 교체하는 과정입니다.</Change1>
    <Change1>2. 술병에 꽂힌 호스를 뽑고 Clear를 눌러주세요</Change1>
    <Change1>feat. 호스를 비우는 단계입니다.</Change1>
    <br />
    <ClearBtn onClick={()=>{
    }} >CLEAR</ClearBtn>

    <Change1>교 체 완 료 🍺</Change1>
    <Change1>1. 비운 호스를 새 술병에 꽂아주세요.</Change1>
    <Change1>2. Done을 눌러주세요.</Change1>
    <br />
    <ClearBtn onClick={()=>{
      handleClose()
    }} >DONE</ClearBtn>
  </Box>
  </>
  )
}

export default ChangeModal

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
