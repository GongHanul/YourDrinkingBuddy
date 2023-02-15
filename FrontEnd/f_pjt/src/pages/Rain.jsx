import styled, {keyframes} from "styled-components";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { safeTerminateIfGamePlayed } from "../store";


export default function AboutUs() {
  const canvas = useRef(null);
  const [ctx, setCts] = useState(undefined);
  const dispatch = useDispatch()
  dispatch(safeTerminateIfGamePlayed())

  useEffect(() => {
      // @ts-ignore
      setCts(canvas.current.getContext('2d'));
  }, []);
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const TOTAL = 150;
  const petalArray = [];
  
  const petalImg = new Image();
  petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png'
  petalImg.onload = () => {
    for (let i = 0; i < TOTAL; i++) {
      petalArray.push(new Petal());
    }
    console.log(petalArray);
    render();
  };
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 0, 0 부터 캔버스 가로 세로 길이를 지우기
    window.requestAnimationFrame(render); // 재귀함수를 통해 반복실행(브라우저마다 차이있지만 평균 초당 60)
    petalArray.forEach((petal) => {
      petal.animate();
    });
  }
  
  window.addEventListener('resize', () => {
    // 윈도우 사이즈가 바뀔때마다 적용
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // 벚꽃잎 클래스
  
  class Petal {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height * 2 - canvas.height;
      this.w = 30 + Math.random() * 15;
      this.h = 20 + Math.random() * 10;
      this.opacity = this.w / 45;
      this.xSpeed = 2 + Math.random();
      this.ySpped = 1 + Math.random();
      this.flip = Math.random();
      this.flipSpeed = Math.random() * 0.03;
    }
  
    draw() {
      if (this.y > canvas.height || this.x > canvas.width) {
        this.x = -petalImg.width;
        this.y = Math.random() * canvas.height * 2 - canvas.height;
        this.xSpeed = 2 + Math.random();
        this.ySpped = 1 + Math.random();
        this.flip = Math.random();
      }
  
      ctx.globalAlpha = this.opacity;
      ctx.drawImage(petalImg, this.x, this.y, this.w * (0.66 + Math.abs(Math.cos(this.flip) / 3)), this.h * (0.8 + Math.abs(Math.sin(this.flip) / 2)));
    }
  
    animate() {
      this.x += this.xSpeed;
      this.y += this.ySpped;
      this.draw();
      this.flip += this.flipSpeed;
    }
  }
  return(
  <>
  <Canvas
    ref={canvas}
    width = {1700}
    height = {800}
  />
  </>
 )
}
const Canvas = styled.canvas`
  overflow : hidden;
`
