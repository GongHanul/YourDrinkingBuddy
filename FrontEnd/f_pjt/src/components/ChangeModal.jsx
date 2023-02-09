import styled from "styled-components";
import { React } from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { changePorts, clearPorts } from "../store";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { CocktailMakerState } from './../store';

function ChangeModal(props) {
  const handleClose = props.handleClose2
  const cocktailMaker = useSelector((state) => state.cocktailMaker);
  
  const port = useSelector((state) => state.port)
  const ports = []
  for(let i=0; i<port.length; i++){
    ports.push(port[i].beverage_id);
  }
  const dispatch = useDispatch();
  const [state, setState] = useState(0);

  const afterClear = () =>{
    setState(1);
  }

  const afterChange = () =>{
    setState(2);
  }
  console.log(ports)
  return (
  <Box sx={style}>
    {(() => {
      console.log(state)
      if(state === 0){
        return (<>
          <Change1>1. 술을 교체하는 과정입니다.</Change1>
          <Change1>2. 술병에 꽂힌 호스를 뽑고 Clear를 눌러주세요</Change1>
          <Change1>feat. 호스를 비우는 단계입니다.</Change1>
          <br />
          {(() => {
            if(cocktailMaker.state === CocktailMakerState.BUSY){
              return (<ClearBtn disabled> 주 조 중 🍺</ClearBtn>)
            }else{
              return (<ClearBtn onClick={()=>{
                dispatch(clearPorts(ports))
                afterClear()
              }} >CLEAR</ClearBtn>);
            }
          })()}
          
        </>)
      }else if(state === 1){
        if(cocktailMaker.state === CocktailMakerState.BUSY){
          return (<Change1>교 체 중 🍺</Change1>) ;
        }else{
          return (<>
            <Change1>교 체 완 료 🍺</Change1>
            <Change1>1. 비운 호스를 새 술병에 꽂아주세요.</Change1>
            <Change1>2. Done을 눌러주세요.</Change1>
            <br />
            <ClearBtn onClick={()=>{
              dispatch(changePorts(ports))
              afterChange()
            }} >DONE</ClearBtn>
          </>
          );
        }
      }else{
        console.log("bye")
        return (<>{handleClose()}</>);
      }
    })()}
  </Box>
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
