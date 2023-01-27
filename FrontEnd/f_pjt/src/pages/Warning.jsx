import styled from "styled-components";
import React from 'react';

function Warning() {  
  return(

  <>
  <MainBody>
    <Warning1>
      WARNING
    </Warning1>
    <Center>
      <Mainlogo alt="logo" src="img/logo.png"/>
      <OKButton>OK</OKButton>
    </Center>
    <Warning2>
      WARNING
    </Warning2>
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
const Center = styled.div`
  flex-direction: column;
`
const Mainlogo = styled.img`
  display: flex;
  width : 45vh;
  margin: 4vh 2vh;
`
const OKButton = styled.button`
  display: flex;
  background : #004680;
  margin : 6vh auto auto auto;
  border : none; 
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 5vh;
  color: #ffffff;
  border-radius: 2vh;
  padding : 1vh 3vh 1vh 2.5vh;
`
const Warning1 = styled.div`
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 7vh;
  color: #004680;
`
const Warning2 = styled.div`
  font-family: 'Irish Grover';
  font-style: normal;
  font-size: 7vh;
  color: #004680;
`

export default Warning;