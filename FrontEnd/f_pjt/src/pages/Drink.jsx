import styled from "styled-components";
import { React, useState, useEffect } from 'react';
import BeverageItem from "../components/BeverageItem";
import { useDispatch, useSelector } from "react-redux"
import{ changeReco, changeRatio, resetRatio } from "../store.js"
import axios from 'axios'
import Modal from '@mui/material/Modal';
import ShotModal from "../components/ShotModal";
import ChangeModal from "../components/ChangeModal";
import { makeCocktail, stopMakeCocktail } from '../store';

function Drink() {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const ratio = useSelector((state)=>state.ratio)
  const cancel = ()=>{
    dispatch(stopMakeCocktail())
  }

  const make = () => {
    dispatch(makeCocktail([ratio[0].rate,ratio[1].rate,ratio[2].rate,ratio[3].rate]))
  }

  const setLengthIfLessFills = (array, length, fills) => {
    let newArray = [];
    if(array.length <= length){
      const needed = length - array.length
      for(const item of array){
        newArray.push(item);
      }
      for(let i=0; i<needed; i++){
        newArray.push(fills);
      }
    }else{
      for(let i=0; i<length; i++){
        newArray.push(array.splice(Math.floor(Math.random() * (array.length-i)),1)[0])
      }
    }
    return newArray;
  }

  const Background = ['#33559C', '#5674BD','#6683D1', '#7996E6']
  const CircleColor = ['#1C2F56', '#223B77', '#2E4C9E', '#3253AC']

  let Recipes = useSelector((state)=> state.recoRecipes)
  let [Pump, setPump] = useState([0,1,2,3])
  let port = useSelector((state)=> state.port)
  let Ratio = useSelector((state)=> state.ratio)

  const MatchRecipe = (ingredients) => {
   
    for (let i = 0; i<4; i++){
      let Port = Ratio[i]
      dispatch(resetRatio({
        idx : i
      }))
    
      for (const ingredient of ingredients){
        

        if(Port.beverage_id === ingredient.beverage_id){
        
          dispatch(changeRatio({
            idx : i,
            rate : ingredient.recipe_ingredient_ratio
          }))
        }
      }
    }}

  useEffect(() => {
    getRecipes()
  }, [port])
  
  let beverages = []
  for (let i of port) {
    if(i.beverage_id >= 0){
      beverages.push(i.beverage_id)
    }
  }
  const URL = 'http://i8a103.p.ssafy.io:3001'
const getRecipes = () => {
    axios.get(URL+'/recipes',{params: {filter: beverages.join(",")}}).then((a)=>{
      dispatch(changeReco(setLengthIfLessFills(a.data.items, 3, {beverages_name: ""})));
    })
    .catch((e)=>{
      console.log("추천레시피 실패")
    })
  }

  return(
    <Maindiv>
      <Topdiv>
          { Recipes.map(function(e, i){
          return (<RecipeItem onClick={()=>{
            MatchRecipe(Recipes[i].ingredients)
            console.log("preset")
          }}>{ Recipes[i].recipe_name }</RecipeItem>)
          })}
        <BtnDiv>
          <Btn onClick={getRecipes}>레시피 추천</Btn>
          <Btn onClick={()=>{
            handleOpen2()}}>
            술교체</Btn>
            <Modal
            open={open2}
            onClose2={handleClose2}>
            <ChangeModal handleClose2 = {handleClose2}/>
            </Modal>
          <Btn  onClick={async ()=>{
            make()
            handleOpen()
            }}>
            SHOT!</Btn>
            <Modal
            open={open}>
            <ShotModal handleClose = {handleClose} cancel = { cancel }/>
            </Modal>
        </BtnDiv>
      </Topdiv>
      <Bottomdiv>
        { Pump.map(function(e, i){
          return (<BeverageItem index={i} background ={Background[i]} circleColor = {CircleColor[i]} getRecipes = {getRecipes}/>)
        })}
      </Bottomdiv>
    </Maindiv>
)
}
const None = styled.span`
  display: non;
`
const Maindiv = styled.body`
  width:100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
  overflow-y : auto;
  overflow-x : auto;
`
const Topdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin : auto 0;
`
const Bottomdiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin : auto 0;
`
const BtnDiv = styled.div`
  flex-direction : column;
`
const Btn = styled.div`
  display: flex;
  align-items: center ;
  justify-content: center;
  margin : 1vh 0 ;
  color: #004680;
  font-family: 'Jua', sans-serif;
  font-weight : bold;
  font-size: 5vh;
  letter-spacing:6px;
  &:link {
    transition : 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: #ce0808;
    filter: drop-shadow(0.3vh 0.3vh 0.1vh rgb(0 0 0 / 0.5));
  }
  &.active {
    filter: drop-shadow(0.3vh 0.3vh 0.1vh rgb(0 0 0 / 0.5));
    color: #FAE59C;
    position: relative;
    top: 1vh;
    border-bottom: 1vh solid #FAE59C;
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
  max-height : 13vh;
  padding: 2vh;
  color: #004680;
  font-size: 4vh;
  font-family: 'Do Hyeon', sans-serif;
  font-weight : bold;
  letter-spacing: 5px;
`

export default Drink