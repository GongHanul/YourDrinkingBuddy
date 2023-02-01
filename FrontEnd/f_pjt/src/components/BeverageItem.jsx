import styled from "styled-components";
import Modal from '@mui/material/Modal';
import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp,faChevronDown } from "@fortawesome/free-solid-svg-icons"
import BeverageListModal from "../components/BeverageListModal";
import{ increaseRatio, decreaseRatio } from "../store.js"
import { useDispatch, useSelector } from "react-redux"

function BeverageItem(props) {  

  const dispatch = useDispatch();

  let num = useSelector((state)=> state.ratio[props.index])

  const Decredible = () => {
    return num.rate > 0 ? dispatch(decreaseRatio(props.index)) : false
      }
  const Incredible = () => {
      return num.rate < 8 ? dispatch(increaseRatio(props.index)) : false
      }
      
  const [image, setImage] = useState('http://cdn.veluga.kr/files/supplier/228/drinks/%E1%84%90%E1%85%A6%E1%84%85%E1%85%A1%20%E1%84%86%E1%85%A2%E1%86%A8%E1%84%8C%E1%85%AE(TERRA%20BEER)_%E1%84%92%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%85%E1%85%A9(hitejinro).png');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return(
  <>
    <Box>
      <Beverageimg
       onClick={handleOpen}
      src = {image}></Beverageimg>
      <Modal
        open={open}
        onClose={handleClose}
      >
       <BeverageListModal/>
      </Modal>
      <UpandDown><FontAwesomeIcon onClick={()=>{
        Incredible()
      }} icon= {faChevronUp}/>
      </UpandDown>
      <Num>{num.rate}</Num>
      <UpandDown><FontAwesomeIcon onClick={()=>{
        Decredible()
      }} icon= {faChevronDown}/>
      </UpandDown>
      
    </Box>
      {/* {isOpen && (<Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />)} */}
  </>
)
}


const Beverageimg = styled.img`
  height : 30vh;
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2vh;
  border: none;
  background-image: linear-gradient(to bottom, white 30%, #DCDCDC 30%);
  align-items: center ;
  justify-content: space-evenly;
  `
const UpandDown = styled.div`
  color: #004680;
  font-size: 10vh;
  margin: auto;
  `
const Num = styled.div`
  color: #494949;
  font-family: 'Do Hyeon', sans-serif;
  font-weight : bold;
  font-size: 8vh;

`

export default BeverageItem