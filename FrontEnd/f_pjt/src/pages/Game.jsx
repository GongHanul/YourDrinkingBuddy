import styled from "styled-components";
import { React, useState } from 'react';
import Gamecard from "../components/Gamecard";
import Gamecard2 from "../components/Gamecard2";

function Game() {
  const randomNum = ['1', '2', '3', '4', '6']
  const random = Math.floor(Math.random() * 5 + 1);
  const shuffle = (array) => {
    for(let index = array.length -1 ; index > 0; index--){
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index +1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] =temporary;
    }
    return array
  }
  shuffle(randomNum)
  console.log(randomNum)
  return (
    <>
    <Gamee>
      <Flexdiv>
      <Gamecard id = {'1'}
      ready = {'#1966A5'}
      background= {'#063C69'}
      font = {'#ffffff'}
      src = {'img/gamelist/heart.png'}
      title = {'# 흥분 하지마!'}
      rule1 = {'# 최저, 최대,'}
      rule2 = {'평균, 갭 차이'}
      rule3 = {'선택하여 벌칙'}
      rule4 = {'게임 전 심박수 측정'}
      ></Gamecard></Flexdiv>

      <Flexdiv>
      <Gamecard2 id = {'2'}
      ready = {'#0E538B'}
      background= {'#0E538B'}
      font = {'#ffffff'}
      src = {'img/gamelist/gram.png'}
      title = {'# 술 넘기지마!'}
      rule1 = {'# 랜덤값이 주어진다'}
      rule2 = {'돌아가며 술을 따르며'}
      rule3 = {'랜덤값을 넘으면 벌칙!'}
      rule4 = {'무게 센서에 잔올리기'}
      ></Gamecard2></Flexdiv>
      
      <Flexdiv>
      <Gamecard id = {'3'}
      ready = {'#063C69'}
      background= {'#1966A5'}
      font = {'#ffffff'}
      src = {'img/gamelist/joystick.png'}
      title = {'# 누가 더 빨리! 많이!'}
      rule1 = {'# 조이패드에 있는'}
      rule2 = {'버튼을 마구 눌러'}
      rule3 = {'낮은 사람이 벌칙!'}
      rule4 = {'화면 숫자 확인'}
      ></Gamecard></Flexdiv>
      
      <Flexdiv>
      <Gamecard id = {'4'}
      ready = {'#D0BB70'}
      background= {'#F4E5B2'}
      font = {'#000000'}
      src = {'img/gamelist/sound_black2.png'}
      title = {'# 누가 시끄럽지!'}
      rule1 = {'# 각 순서에 따라서'}
      rule2 = {'큰 소리 낸 사람이'}
      rule3 = {'승자! 지명 벌칙!'}
      rule4 = {'시간에 따라 차례대로'}
      ></Gamecard></Flexdiv>
      
      <Flexdiv>
      <Gamecard id = {randomNum[0]}
      ready = {'#EDD582'}
      background= {'#EDD582'}
      font = {'#000000'}
      src = {'img/gamelist/random.png'}
      title = {'# RANDOM GAME'}
      rule1 = {'# 랜덤 게임'}
      rule2 = {'두근두근'}
      rule3 = {'무슨 게임일까~'}
      rule4 = {'센스껏 게임파악'}
      ></Gamecard></Flexdiv>
      
      <Flexdiv>
      <Gamecard id = {'6'}
      ready = {'#F4E5B2'}
      background= {'#D0BB70'}
      font = {'#000000'}
      src = {'img/gamelist/joystick_black.png'}
      title = {'# 지금 몇초?!'}
      rule1 = {'# START 누른 후'}
      rule2 = {'10초 후 버튼 클릭!'}
      rule3 = {'갭이 큰 사람 벌칙!'}
      rule4 = {'시간을 맞춰라'}
      ></Gamecard></Flexdiv>      
  
    </Gamee>
  </>
  )
}
const Gamee = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  overflow-y : auto;
  height : 100vh;
  `
  // font-family: 'Do Hyeon', sans-serif;
const Flexdiv = styled.div`
  flex: 1 1 30%;
  
`
// font-family: 'Changa', sans-serif;
// font-family: 'Hanalei Fill', cursive;
// font-family: 'Nabla', cursive;
// font-family: 'Orbitron', sans-serif;
// font-family: 'Shojumaru', cursive;
// font-family: 'Silkscreen', cursive;
export default Game