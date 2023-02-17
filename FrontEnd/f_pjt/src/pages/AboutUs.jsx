import styled, {keyframes} from "styled-components";
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons"
import { safeTerminateIfGamePlayed } from "../store";
import { useDispatch } from "react-redux";

export default function AboutUs() {

  const dispatch = useDispatch()
  dispatch(safeTerminateIfGamePlayed())

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
    padding : 0 10vh;
    background: #D3DEEA;
  `
  const Flexdiv = styled.div`
    flex: 1 1 30%;
    align-items: center ;
    justify-content: center;
  `
  const Name = styled.div`
    font-size: 3.5vh;
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
        height="170"
        image="img/profile/쥐.png"
      />
      <CardContent>
        <Name>
          강승권
        </Name>
        <Content>
          백엔드
        </Content>
        <Content>
        짧은 기간 동안 함께 개발해서 즐거웠습니다. 특히 결과물이 예뻐서 마음에 들었습니다.
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
        height="170"
        image="img/profile/펭귄.png"
      />
      <CardContent>
        <Name>
          공한울
        </Name>
        <Content>
          임베디드
        </Content>
        <Content>
        멋지고 이쁘고 다하시는 우리 언니오빠들 덕에 공통 프젝 하는 동안 정말 즐겁게 개발했습니다! 무한 감사 드립니다❤
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
        height="170"
        image="img/profile/돼지.png"
      />
      <CardContent>
        <Name>
          김소현
        </Name>
        <Content>
          임베디드
        </Content>
        <Content>
        새로운 인연, 기술적 경험 그리고 멋진 산출물까지 귀중한 시간이었습니다. 모두 마지막까지 화이팅입니다!
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
        height="170"
        image="img/profile/양.png"
      />
      <CardContent>
        <Name>
          이경진
        </Name>
        <Content>
          프론트엔드
        </Content>
        <Content>
          Iot라는 새로운 분야에서 새로운 기술과 함께 재밌는 결과물이 나와서 너무 좋았습니다! 모두들 마지막까지 고생많았옹❤
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
        height="170"
        image="img/profile/강아지.png"
      />
      <CardContent>
        <Name>
          장재현
        </Name>
        <Content>
          임베디드
        </Content>
        <Content>
        함께해서 즐거웠고 감사했습니다. 다들 끝까지 화이팅!
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
        height="170"
        image="img/profile/곰.png"
      />
      <CardContent>
        <Name>
          최성빈
        </Name>
        <Content>
          프론트엔드
        </Content>
        <Content>
          7주가 짧게 느껴질만큼 즐거운 시간이었습니다. 마지막까지 화이팅!
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
