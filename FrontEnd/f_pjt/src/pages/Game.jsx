import styled from "styled-components";
import { React, useState } from 'react';
import Gamecard from "../components/Gamecard";

function Game() {
  return (
    <>
    <Gamee>
      <Flexdiv>
      <Gamecard id = {'1'}
      ready = {'#1966A5'}
      background= {'#063C69'}
      font = {'#ffffff'}
      src = {'img/heart.png'}
      title = {'# 흥분 하지마!'}
      rule1 = {'# 최저, 최대,'}
      rule2 = {'평균, 갭 차이'}
      rule3 = {'선택하여 벌칙'}
      rule4 = {'게임 전 개인 심박수 측정'}
      nav = {'/game1'}
      ></Gamecard></Flexdiv>

      <Flexdiv>
      <Gamecard id = {'2'}
      ready = {'#0E538B'}
      background= {'#0E538B'}
      font = {'#ffffff'}
      src = {'img/gram.png'}
      title = {'# 술 넘기지마!'}
      rule1 = {'# 임의의 랜덤값이 주어진다'}
      rule2 = {'돌아가면서 술을 따르며'}
      rule3 = {'랜덤값을 넘으면 벌칙!'}
      rule4 = {'게임 전 잔을 무게 센서에 올리기'}
      nav = {'/game2'}
      ></Gamecard></Flexdiv>
      
      <Flexdiv>
      <Gamecard id = {'3'}
      ready = {'#063C69'}
      background= {'#1966A5'}
      font = {'#ffffff'}
      src = {'img/joystick.png'}
      title = {'# 누가 더 빨리! 많이!'}
      rule1 = {'# 조이패드에 있는'}
      rule2 = {'4개의 버튼을 마구마구 눌러라!'}
      rule3 = {'적게 나온 사람이 벌칙!'}
      rule4 = {'화면에 나오는 숫자 확인'}
      nav = {'/game3'}
      ></Gamecard></Flexdiv>
      
      <Flexdiv>
      <Gamecard id = {'4'}
      ready = {'#D0BB70'}
      background= {'#F4E5B2'}
      font = {'#000000'}
      src = {'img/sound_black2.png'}
      title = {'# 누가 더 시끄럽나!'}
      rule1 = {'# 각 순서에 따라서'}
      rule2 = {'평균, 갭 차이'}
      rule3 = {'나온사람이 벌칙!'}
      rule4 = {'눈치껏 조용한 타이밍 시작'}
      nav = {'/game4'}
      ></Gamecard></Flexdiv>
      
      <Flexdiv>
      <Gamecard id = {'5'}
      ready = {'#EDD582'}
      background= {'#EDD582'}
      font = {'#000000'}
      src = {'img/gram_black.png'}
      title = {'# 무게가 어느정도지?'}
      rule1 = {'# 한명씩 돌아가면서'}
      rule2 = {'물건을 올려 랜덤값에서'}
      rule3 = {'제일 먼 사람이 벌칙!'}
      rule4 = {'돌아가면서 무게 측정!'}
      nav = {'/game5'}
      ></Gamecard></Flexdiv>
      
      <Flexdiv>
      <Gamecard id = {'6'}
      ready = {'#F4E5B2'}
      background= {'#D0BB70'}
      font = {'#000000'}
      src = {'img/joystick_black.png'}
      title = {'# 60초는 언제?!'}
      rule1 = {'# START 누른 후'}
      rule2 = {'10초 후 버튼 클릭!'}
      rule3 = {'차이가 젤 큰 사람 벌칙!'}
      rule4 = {'10초를 맞춰라!'}
      nav = {'/game6'}
      ></Gamecard></Flexdiv>      
  
    </Gamee>
  </>
  )
}
const Gamee = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: 'Jua', sans-serif;
  overflow-y : auto;
  `
  // font-family: 'Do Hyeon', sans-serif;
const Flexdiv = styled.div`
  flex: 1 1 30%;
`

export default Game