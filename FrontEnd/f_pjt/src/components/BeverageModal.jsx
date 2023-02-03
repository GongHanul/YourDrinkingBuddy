import styled from "styled-components";
import Box from '@mui/material/Box';
import { React } from 'react';
import { useSelector, useDispatch } from "react-redux"
import{ changePort } from "../store.js"


function BeverageModal(props) {

  let Beverages = useSelector((state)=> state.beverage)
  // let port = useSelector((state)=>state.port[props.index])
  
  const dispatch = useDispatch();
  // const onclickhandler = (i)=>{
  //   dispatch(changePort(
  //     {idx: props.index,
  //      beverage_id : Beverages[i].beverage_id }
  //     )
  //   )
  //   console.log("dispatch")
  // }
  return (
  <>
  <Box sx={style}>
    { Beverages.map(function(e, i){
    return (<div onClick={props.handleClose}><SulList onClick={()=>
      dispatch(changePort({
      beverage_id : Beverages[i].beverage_id,
      beverage_image_url : Beverages[i].beverage_image_url,
      idx : props.index
    }))}>{ Beverages[i].beverage_name }
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
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: '0 2px 4px, 0px 1px 2px inset',
  p: 4,
  borderRadius: '2vh',
  display : 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY : 'auto',
  background : '#004680',

};

const SulList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center ;
  margin: 1vh;
  padding: 1vh;
  /* box-shadow: 0 2px 4px, 0px 2px 4px #474747 inset; */
  /* border-radius : 1vh; */
  font-weight : bold;
  color: #ffffff;
  min-width: 5vw;
  font-size : 2.2em;
  font-family: 'Jua', sans-serif;
  /* font-family: 'Do Hyeon', sans-serif; */
  letter-spacing: 5px;
  `