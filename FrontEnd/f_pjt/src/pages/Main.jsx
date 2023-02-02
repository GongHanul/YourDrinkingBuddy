import styled from "styled-components";
import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMartiniGlassCitrus, faGamepad, faClipboardList } from "@fortawesome/free-solid-svg-icons"

function Main() {  
  return(
  <>
  <MainBody>
    <Left>
      <UseRule>사용설명서</UseRule>
      <br />
      <br />
      <UseRule1><FontAwesomeIcon icon= { faGamepad }/>  '게임' </UseRule1>
      <UseRule1><FontAwesomeIcon icon={ faMartiniGlassCitrus }/>  '폭탄주 제조' </UseRule1>
      <UseRule1>SHOT!  '폭탄주 추출' </UseRule1>
      <UseRule1><FontAwesomeIcon icon = { faClipboardList }/>  '전체 레시피' </UseRule1>
    </Left>
    <Center>
      <Mainlogo alt="logo" src="img/logo.png"/>
      <NavStyle to="/game">게임하러가기🎮🥇🏆</NavStyle>
      <NavStyle to="/drink">🍻🍸🍹술마시러가기</NavStyle>
    </Center>
    <Right>
      <Warning>주의사항</Warning>
      <br />
      <br />
      <Warning1>1. 정해진 잔만 사용</Warning1>
      <Warning1>2. 디스펜서는 깨끗히</Warning1>
      <Warning1>3. 센서는 소중히</Warning1>
      <Warning1>4. 알잘딱깔센</Warning1>
    </Right>
  </MainBody>
  </>
)
}

// const Main = styled.div`
//   display: flex;
// `
const MainBody = styled.div`
  display: flex;
  margin : auto;
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center ;
  justify-content: center;
`
const Center = styled.div`
  display: flex;
  flex-direction: column;
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center ;
  justify-content: center;
`
const Mainlogo = styled.img`
  display: flex;
  width : 45vh;
  margin: 4vh 2vh;
`
const NavStyle = styled(NavLink)`
  background : #004680;
  margin : 2vh auto;
  border : none; 
  font-family: 'Do Hyeon', sans-serif;
  font-size: 4vh;
  color: #ffffff;
  border-radius: 2vh;
  padding : 1vh 1.5vh 1vh 2vh;
  &:link {
    text-decoration: none;
  }
  &:hover {
    color: #004680;
    background : #ffffff;
  }
`
const UseRule = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 7vh;
  color: #004680;
  padding: 0 5vh 0 0;
`
const UseRule1 = styled.div`
font-family: 'Do Hyeon', sans-serif;
font-size: 4vh;
color: #004680;
padding: 0 5vh 0 0;
`
const Warning = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 7vh;
  color: #004680;
  padding: 0 0 0 5vh;
`
const Warning1 = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 4vh;
  color: #004680;
  padding: 0 0 0 5vh;
`

export default Main;