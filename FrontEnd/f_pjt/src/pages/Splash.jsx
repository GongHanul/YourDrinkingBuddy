import styled from "styled-components";
import { React, useEffect } from 'react';
import{ inputBeverage, setBeverages, inputRecipe, safeTerminateIfGamePlayed } from "../store.js"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";

function Splash() {
  const URL= 'http://i8a103.p.ssafy.io:3001'
  
  const dispatch = useDispatch();
  dispatch(safeTerminateIfGamePlayed())

  const getBeverage = () => {
    axios.get(URL+'/beverages').then((a)=>{
      dispatch(inputBeverage(a.data.items))
      dispatch(setBeverages(a.data.items))
      console.log("dispatch_Beverage")

    })
    .catch((e)=>{
      console.log("dispatch 실패error")

    })
  }
  const getRecipe = () => {
    axios.get(URL+'/recipes').then((a)=>{
      dispatch(inputRecipe(a.data.items))
      console.log("dispatch_inputRecipe")
    })
    .catch((e)=>{
      console.log("dispatch 실패 레시피 error")

    })
  }

  const Beverages = useSelector((state)=>{return state.beverage})
  console.log('Bevarges 상태',Beverages)
  const Recipes = useSelector((state)=>{return state.recipe})
  console.log('Recipes 상태',Recipes)
  
  useEffect(()=>{
    getBeverage()
    getRecipe()
    }, [])


  return (
    <>
    <Center>
    <Img alt="splashlogo" src="img/splashlogo.png"/>
    <Copyright>
      Copyright 2023. Korean Black Rasberry All rights reserved
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
  width: 100vw;
  height: 100vh;
`
const Img = styled.img`
  display: flex;
  height : 50vh;
`
const Copyright = styled.p`
  color: #ffffff;
  position: sticky ;
  display: flex;
  top: 88vh;
  font-size : 2vh;
  letter-spacing: 2px;
`

export default Splash