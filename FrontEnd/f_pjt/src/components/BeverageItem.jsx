import styled from "styled-components";
import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp,faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Modal from "../components/TheModal";


function BeverageItem() {  
  let [count, setCount] = useState(0)
  // let [modal, setModal] = useState(false);
  const Decredible = () => {
    return count > 0 ? setCount(pre => pre - 1) : false
    }
  const Incredible = () => {
      return count < 8 ? setCount(pre => pre + 1) : false
      }
  const [isOpen, setIsOpen] = useState(false);

  const [image, setImage] = useState('http://cdn.veluga.kr/files/supplier/228/drinks/%E1%84%90%E1%85%A6%E1%84%85%E1%85%A1%20%E1%84%86%E1%85%A2%E1%86%A8%E1%84%8C%E1%85%AE(TERRA%20BEER)_%E1%84%92%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%85%E1%85%A9(hitejinro).png');

  return(
  <>
    <Box>
      <Beverageimg
       onClick={()=>{
        setIsOpen(true)}} 
        src = {image}></Beverageimg>
      <UpandDown><FontAwesomeIcon onClick={()=>{
        Incredible(count);
      }} icon= {faChevronUp} size="5x"/>
      </UpandDown>
      <Num>{count}</Num>
      <UpandDown><FontAwesomeIcon onClick={()=>{
        Decredible(count);
      }} icon= {faChevronDown} size="5x"/>
      </UpandDown>
      
    </Box>
      {isOpen && (<Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />)}
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
  margin: auto 2vh;
  padding: 3vh;
  background-image: linear-gradient(to bottom, white 30%, #DCDCDC 30%);
  align-items: center ;
  justify-content: space-evenly;
`
const UpandDown = styled.div`
  color: #004680;
  margin: 3vh auto;
`
const Num = styled.div`
  color: #494949;
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 7vh;

`

export default BeverageItem