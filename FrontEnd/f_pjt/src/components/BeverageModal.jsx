import styled from "styled-components";
import Box from '@mui/material/Box';
import { React } from 'react';
import { useSelector, useDispatch } from "react-redux"
import{ changePort, changeBeverage } from "../store.js"


function BeverageModal(props) {

  let port = useSelector((state)=> state.port)

  let beverages = []
  for (let i of port) {
    if(i.beverage_id >= 0){
      beverages.push(i.beverage_id)
    }
  }

  let Beverages = useSelector((state)=> state.beverage)

  const dispatch = useDispatch();

  return (
  <>
  <Box sx={style}>
    { Beverages.map(function(e, i){
    return (<div onClick={props.handleClose}><SulList onClick={()=>
      {dispatch(changePort({
      beverage_id : Beverages[i].beverage_id,
      beverage_image_url : Beverages[i].beverage_image_url,
      idx : props.index
    }))
    dispatch(changeBeverage({
      beverage_id : Beverages[i].beverage_id,
      idx : props.index
    }))
  }
      }>{ Beverages[i].beverage_name }
    </SulList></div>)
    })}
    </Box>
  </>
  )
}

export default BeverageModal

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height : '70%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0 2px 4px, 0px 1px 2px inset',
  p: 2,
  borderRadius: '2vh',
  display : 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY : 'auto',
  background : '#004680f0',

};

const SulList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center ;
  margin: 1vh;
  padding: 1vh;
  border-radius : 1vh;
  color: #ffffff;
  font-size : 5vh;
  /* font-family: 'Jua', sans-serif; */
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.7));
  letter-spacing: 5px;
  `