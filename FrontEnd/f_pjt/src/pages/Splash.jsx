import styled from "styled-components";
import React from 'react';

function Splash() {
  return (
    <>
    <Center>
    <Img alt="splashlogo" src="img/splashlogo.png"/>
    <Copyright>
      <p>Copyright 2023. Korean Black Rasberry All rights reserved</p>
    </Copyright>
    </Center>
  </>
  )
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center ;
  justify-content: center;
  background: #004680;
  width: 100%;
`
const Img = styled.img`
  display: flex;
  width: 50vh;
  height : 50vh;
`
const Copyright = styled.div`
  color: #ffffff;
  position: sticky ;
  display: flex;
  top: 88vh;
  font-size : 2.5vh;
`

export default Splash