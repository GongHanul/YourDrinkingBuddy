import styled from "styled-components";
import Modal from '@mui/material/Modal';
import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp,faChevronDown } from "@fortawesome/free-solid-svg-icons"
import BeverageModal from "../components/BeverageModal";
import{ increaseRatio, decreaseRatio } from "../store.js"
import { useDispatch, useSelector } from "react-redux"

function BeverageItem(props) { 
  const Box = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2vh;
  border: none;
  background : ${props.background};
  align-items: center ;
  justify-content: space-evenly;
  box-shadow: 0 2px 4px;
  padding : 3vh;
  `
  const Circle = styled.div`
  width : 20vh;
  height : 20vh;
  border-radius : 50%;
  background: ${props.circleColor};
  box-shadow: 1px 2px 4px #474747;
`
const Num = styled.div`
  color:${props.circleColor};
  font-family: 'Do Hyeon', sans-serif;
  font-weight : bold;
  font-size: 8vh;
  margin: -3vh;
  filter: drop-shadow(0.2vh 0.4vh 0.1vh rgb(0 0 0 / 0.5));
  `
  const dispatch = useDispatch();
  
  let num = useSelector((state)=> state.ratio[props.index])
  let Image = useSelector((state)=> state.port[props.index].beverage_image_url)
  let port = useSelector((state)=>state.port)

  
  const Decredible = () => {
    return num.rate > 0 ? dispatch(decreaseRatio(props.index)) : false
  }
  const Incredible = () => {
    return num.rate < 8 ? dispatch(increaseRatio(props.index)) : false
  }
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  return(
  <>
    <Box>
      <Beverageimg
       onClick={handleOpen}
      src = {Image}></Beverageimg>
      <Modal
        open={open}
        onClose={handleClose}
      >
       <BeverageModal
       getRecipes = { props.getRecipes }
       reco = { props.getRecipes }
       index = { props.index }
       handleClose = {handleClose}/>
      </Modal>
      <Circle></Circle>
      <UpandDown>
      <FontAwesomeIcon onClick={()=>{
        Incredible()
        }} icon= {faChevronUp}/>
      </UpandDown>
      <Num>{num.rate}</Num>
      <UpandDown>
        <FontAwesomeIcon onClick={()=>{
        Decredible()
        }} icon= {faChevronDown}/>
      </UpandDown>
      
    </Box>
  </>
)
}

const Beverageimg = styled.img`
  height : 30vh;
  max-width : 5vw;
  position: relative;
  top: 3vh;
  margin: -13vh 0;
`
const UpandDown = styled.div`
  color: #ffffff;
  font-size: 10vh;  
  filter: drop-shadow(0.4vh 0.4vh 0.1vh rgb(0 0 0 / 0.5));
`

export default BeverageItem