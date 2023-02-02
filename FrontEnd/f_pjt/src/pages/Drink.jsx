import styled from "styled-components";
import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"
import BeverageItem from "../components/BeverageItem";


function Drink() {  
  const Background = ['#646D71', '#9A836F','#646D71', '#9A836F']
  const CircleColor = ['#2F3335', '#5C4531','#2F3335', '#5C4531']
  // const Background = ['#646D71', '#9A836F','#EEBC9E', '#F4DBB2']
  // const CircleColor = ['#2F3335', '#5C4531','#915938', '#8A6528']
  let [Recipes, setRecipe] = useState(['쏘맥', '소백산맥', '막소사'])
  let [Pump, setPump] = useState([0,1,2,3])
  return(
    <Maindiv>
      <Topdiv>
          { Recipes.map(function(e, i){
          return (<RecipeItem>{ Recipes[i] }</RecipeItem>)
          })}
        <Reset><FontAwesomeIcon icon= { faRotateRight } /></Reset>
      </Topdiv>
      <Bottomdiv>
        { Pump.map(function(e, i){
          return (<BeverageItem index={i} background ={Background[i]} circleColor = {CircleColor[i]}/>)
        })}
      </Bottomdiv>
    </Maindiv>
)
}
const Maindiv = styled.body`
  width:100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
`
const Topdiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin : auto 0;
`
const Bottomdiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin : auto 0;
`
const Reset = styled.div`
  display: flex;
  align-items: center ;
  justify-content: center;
  box-shadow: 0 2px 4px #004680, 0px 2px 4px #004680 inset;
  box-sizing: border-box;
  border-radius: 1vh;
  width: 25vh;
  padding: 3vh;
  color: #004680;
  font-size: 2em;
  letter-spacing:10px

  &:link {
    transition : 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: red;
  }
  &.active {
    color: 	Goldenrod;
    position: relative;
    top: 1vh;
    border-bottom: 1vh solid 	Goldenrod;
  }
`
const RecipeItem = styled.div`
  display: flex;
  align-items: center ;
  justify-content: space-evenly;
  box-shadow: 0 2px 4px #004680, 0px 2px 4px #004680 inset;
  box-sizing: border-box;
  border-radius: 2vh;
  width: 25vh;
  padding: 2vh;
  color: #004680;
  font-size: 4vh;
  font-family: 'Do Hyeon', sans-serif;
  font-weight : bold;
`

export default Drink