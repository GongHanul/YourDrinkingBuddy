import styled, {keyframes} from "styled-components";
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons"

export default function AboutUs() {
  const LKJ = "https://github.com/2kjin"
  const CSB = "https://github.com/Bin-Choi"
  const JJH = "https://github.com/jaehyeon-git"
  const GHU = "https://github.com/GongHanul"
  const KSH = "https://github.com/s5hyeonkim"
  const KSK = "https://github.com/user188245"

  const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center ;
    overflow-y : auto;
    height : 100vh;
    width : 100vw;
    padding : 0 4vh;
    background: #D3DEEA;
  `
  const Flexdiv = styled.div`
    flex: 1 1 30%;
    align-items: center ;
    justify-content: center;
  `
  const Name = styled.div`
    font-size: 4vh;
    font-weight : bold;
    padding-bottom: 1vh;
    font-family: 'Lato', sans-serif;
  `
  const Content = styled.div`
    font-size: 2vh;
    font-weight : bold;
    padding-top: .5vh;
    text-indent: 1vh;
  font-family: 'Lato', sans-serif;
  `
  const Btn = styled.button`
    border : none;
    background : none;
    font-size: 2vh;
    color : #004680;
    font-family: 'Lato', sans-serif;
    font-weight : bold;
`
  return(
  <Main>
  <Flexdiv>
    <Card sx={{ maxWidth: 345 , boxShadow : 2}}>
      <CardMedia
        component="img"
        height="200"
        image="img/profile/쥐.png"
      />
      <CardContent>
        <Name>
          강승권
        </Name>
        <Content>
          백엔드
        </Content>
      </CardContent>
      <CardActions>
        <Btn onClick={()=>{window.open(KSK)}}>GITHUB <FontAwesomeIcon icon={ faSquareGithub }/></Btn>
      </CardActions>
    </Card>
  </Flexdiv>
  <Flexdiv>
    <Card sx={{ maxWidth: 345 , boxShadow : 2}}>
      <CardMedia
        component="img"
        height="200"
        image="img/profile/펭귄.png"
      />
      <CardContent>
        <Name>
          공한울
        </Name>
        <Content>
          임베디드
        </Content>
      </CardContent>
      <CardActions>
        <Btn onClick={()=>{window.open(GHU)}}>GITHUB <FontAwesomeIcon icon={ faSquareGithub }/></Btn>
      </CardActions>
    </Card>
  </Flexdiv>
  <Flexdiv>
    <Card sx={{ maxWidth: 345 , boxShadow : 2}}>
      <CardMedia
        component="img"
        height="200"
        image="img/profile/돼지.png"
      />
      <CardContent>
        <Name>
          김소현
        </Name>
        <Content>
          임베디드
        </Content>
      </CardContent>
      <CardActions>
        <Btn onClick={()=>{window.open(KSH)}}>GITHUB <FontAwesomeIcon icon={ faSquareGithub }/></Btn>
      </CardActions>
    </Card>
  </Flexdiv>
  <Flexdiv>
    <Card sx={{ maxWidth: 345 , boxShadow : 2}}>
      <CardMedia
        component="img"
        height="200"
        image="img/profile/양.png"
      />
      <CardContent>
        <Name>
          이경진
        </Name>
        <Content>
          프론트엔드
        </Content>
      </CardContent>
      <CardActions>
        <Btn  onClick={()=>{window.open(LKJ)}}>GITHUB <FontAwesomeIcon icon={ faSquareGithub }/></Btn>
      </CardActions>
    </Card>
  </Flexdiv>
  <Flexdiv>
    <Card sx={{ maxWidth: 345 , boxShadow : 2}}>
      <CardMedia
        component="img"
        height="200"
        image="img/profile/강아지.png"
      />
      <CardContent>
        <Name>
          장재현
        </Name>
        <Content>
          임베디드
        </Content>
      </CardContent>
      <CardActions>
        <Btn  onClick={()=>{window.open(JJH)}}>GITHUB <FontAwesomeIcon icon={ faSquareGithub }/></Btn>
      </CardActions>
    </Card>
  </Flexdiv>
  <Flexdiv>
    <Card sx={{ maxWidth: 345 , boxShadow : 2}}>
      <CardMedia
        component="img"
        height="200"
        image="img/profile/곰.png"
      />
      <CardContent>
        <Name>
          최성빈
        </Name>
        <Content>
          프론트엔드
        </Content>
      </CardContent>
      <CardActions>
        <Btn onClick={()=>{window.open(CSB)}}>GITHUB <FontAwesomeIcon icon={ faSquareGithub }/></Btn>
      </CardActions>
    </Card>
  </Flexdiv>
  </Main>
 )
}
