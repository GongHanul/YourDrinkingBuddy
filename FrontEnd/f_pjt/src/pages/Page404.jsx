import styled, {keyframes} from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Page404() {  
  const navigate = useNavigate();
  const Gohome = (() =>{
    navigate("/")
  })
  return(
  <>
  <Background>
  <Top>
    <H1>404</H1>
    <H3>page not found</H3>
  </Top>
  <Container>
    <Ghostcopy>
      <One></One>
      <Two></Two>
      <Three></Three>
      <Four></Four>
    </Ghostcopy>
    <Ghost>
      <Face>
        <Eye></Eye>
        <Eyeright></Eyeright>
        <Mouth></Mouth>
      </Face>
    </Ghost>
    <Shadow></Shadow>
  </Container>
  <Bottom>
    <P>Boo, looks like a ghost stole this page!</P>
    <Buttons>
      <Btn onClick={Gohome}>Home</Btn>
      <Btn onClick={Gohome}>About Us</Btn>
    </Buttons>
  </Bottom>
  </Background>
  </>
 )
}

const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`

const float = keyframes `
  50% {
     transform: translateY(15px);
  }
`

const Background = styled.div` 
  display : flex;
  justify-content: center;
  align-items: center ;
  flex-direction: column;
  background: #D3DEEA;
  width : 100vw;
  height : 100vh;
`
const Top = styled.div` 
  margin-top: 30px;
`
const Container = styled.div` 
  margin: 0 auto;
  position: relative;
  width: 250px;
  height: 250px;
  margin-top: -40px;
`
const Ghostcopy = styled.div` 
  width: 50%;
  height: 53%;
  left: 25%;
  top: 10%;
  position: absolute;
  border-radius: 50% 50% 0 0;
  background: #EDEDED;
  border: 1px solid #BFC0C0;
  border-bottom: none;
  animation: ${float} 2s ease-out infinite;
  z-index: 0;
`
const One = styled.div` 
  position: absolute;
  background: #EDEDED;
  top: 85%;
  width: 25%;
  height: 23%;
  border: 1px solid #BFC0C0;
  z-index: 0;
  border-radius: 0 0 100% 30%;
  left: -1px;
`
const Two = styled.div` 
  position: absolute;
  background: #EDEDED;
  top: 85%;
  width: 25%;
  height: 23%;
  border: 1px solid #BFC0C0;
  z-index: 0;
  left: 23%;
  border-radius: 0 0 50% 50%;
`
const Three = styled.div` 
  position: absolute;
  background: #EDEDED;
  top: 85%;
  width: 25%;
  height: 23%;
  border: 1px solid #BFC0C0;
  z-index: 0;
  left: 50%;
  border-radius: 0 0 50% 50%;
`
const Four = styled.div` 
  position: absolute;
  background: #EDEDED;
  top: 85%;
  width: 25%;
  height: 23%;
  border: 1px solid #BFC0C0;
  z-index: 0;
  left: 74.5%;
  border-radius: 0 0 30% 100%;
`
const Ghost = styled.div` 
  width: 50%;
  height: 53%;
  left: 25%;
  top: 10%;
  position: absolute;
  border-radius: 50% 50% 0 0;
  background: #EDEDED;
  border: 1px solid #BFC0C0;
  border-bottom: none;
  animation: ${float} 2s ease-out infinite;
`
const Face = styled.div` 
  position: absolute;
  width: 100%;
  height: 60%;
  top: 20%;
`
const Eye = styled.div` 
  position: absolute;
  background: #585959;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  top: 40%;
  left: 25%;
`
const Eyeright = styled.div` 
  position: absolute;
  background: #585959;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  top: 40%;
  right: 25%;
`
const Mouth = styled.div` 
  position:absolute;
  top: 50%;
  left: 45%;
  width: 10px;
  height: 10px;
  border: 3px solid;
  border-radius: 50%;
  border-color: transparent #585959 #585959 transparent;
  transform: rotate(45deg);
`
const Shadow = styled.div` 
  position: absolute;
  width: 30%;
  height: 7%;
  background: #BFC0C0;
  left: 35%;
  top: 80%;
  border-radius: 50%;
  animation: ${scale} 2s infinite;
`
const Bottom = styled.div` 
  margin-top: 10px;
`
const Buttons = styled.div` 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`
const H1 = styled.h1` 
  text-align: center;
  font-size: 9em;
  margin: 0;
  text-shadow: -1px 0 #BFC0C0, 0 1px #BFC0C0, 1px 0 #BFC0C0, 0 -1px #BFC0C0;
`
const H3 = styled.h3`
  font-family: 'Lato', sans-serif;
  font-size: 2em;
  text-transform: uppercase;
  text-align: center;
  color: #BFC0C0;
  margin-top: -20px;
  font-weight: 900; 
`
const P = styled.p` 
  text-align: center;
  font-family: 'Lato', sans-serif;
  color: #585959;
  font-size: .6em;
  margin-top: -20px;
  text-transform: uppercase;
`
const Btn = styled.button` 
  background: #EDEDED;
  padding: 15px 20px;
  margin: 5px;
  color: #585959;
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  font-size: .6em;
  letter-spacing: 1px;
  border: 0;
  &:hover {
    background: #BFC0C0;
    transition: all .4s ease-out;
  }
`

export default Page404;