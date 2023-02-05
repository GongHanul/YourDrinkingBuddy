import { React, useState } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMartiniGlassCitrus, faGamepad, faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import axios from 'axios'
import Modal from '@mui/material/Modal';
import ShotModal from "./components/ShotModal";


function SideNav() {
    const ratio = useSelector((state)=>state.ratio)
    const URL = "http://70.12.226.153:5000/api/motor"
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);;
    const handleClose = () => setOpen(false);
    
  return (
    <Bar>
    <Side>
      <NavStyle to="/game" >
      <FontAwesomeIcon icon= { faGamepad }/>
      </NavStyle>
      <NavStyle to="/drink">
        <FontAwesomeIcon icon={ faMartiniGlassCitrus }/>
      </NavStyle>
      <Shot 
        onClick={()=>{
        axios.post(URL, {ratio: [ String(ratio[0].rate) , String(ratio[1].rate) , String(ratio[2].rate) , String(ratio[3].rate)]})
        .then((결과)=>{
          console.log("good")
        })
        .catch(()=>{
          console.log({ratio: [ String(ratio[0].rate) , String(ratio[1].rate) , String(ratio[2].rate) , String(ratio[3].rate)]})
        })
        handleOpen()
        setTimeout(function(){handleClose()},5000)
      }}>
        SHOT!</Shot>
        <Modal
        open={open}
        // onClose={handleClose}
      >
       <ShotModal handleClose = {handleClose}
        />
      </Modal>
      <NavStyle to="/recipe">
        <FontAwesomeIcon icon = { faClipboardList }/>
      </NavStyle>
    </Side>
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  background: #004680;
`
const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center ;
  justify-content: space-evenly;
  width: 20vh;
  height : 100vh;
  background: #004680;
`
const NavStyle = styled(NavLink)`
  display: flex;
  align-items: center ;
  justify-content: center;
  color: white;
  padding: 2vh;
  font-size: 8vh;
  &:link {
    transition : 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: lightyellow;
  }
  &.active {
    color: #FAE59C;
    position: relative;
    top: 1vh;
    border-bottom: 1vh solid #FAE59C;
  }
`

const Shot = styled.div`
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  font-style: normal;
  font-size: 6vh;
  color: #ffffff;
  align-items: center ;
  justify-content: center;
  color: white;
  padding: 2vh;
`
// const Img = styled.img`
//   width: 10vh;
// `
// https://m.blog.naver.com/hyj5657/110167206983
export default SideNav;
