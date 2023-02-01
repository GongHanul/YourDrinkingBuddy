import styled from "styled-components";
import { React, useState } from 'react';
import Box from '@mui/material/Box';

function ShotModal() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
  <>
  <Box sx={style}>
     <Loading>제 조 중!</Loading>
     <Loading>가 마 니 이 써</Loading>
     <StopBtn onClick={handleClose}>SSSSSTOP</StopBtn>
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
  boxShadow: 24,
  borderRadius: '2vh',
  padding : 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent : 'center',
  flexDirection: 'column',
};
const Loading = styled.div`
  font-size: 5vh;
  font-family: 'Do Hyeon', sans-serif;
`
const StopBtn = styled.button`
  display: flex;
  margin: 3vh 0 0 0 ;
  background: #ffffff;
  border : none;
  border-radius : 1vh;
  color : #004680;
  font-family: 'Play', sans-serif;
  font-weight : bold;
  font-style: normal;
  font-size: 3vh;
  padding : 1vh 3vh 1vh 2.5vh;
  &:hover {
    color: red;
  }
`
// const ModalBox = styled.div`
// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
// width: 50vh
// bgcolor: background.paper;
// border: none;
// boxShadow: 24;
// `