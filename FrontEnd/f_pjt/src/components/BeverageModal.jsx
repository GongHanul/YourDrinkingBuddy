import styled from "styled-components";
import Box from '@mui/material/Box';
import { React } from 'react';
import { useSelector, useDispatch } from "react-redux"
import{ changePort, changeBeverage, changeReco } from "../store.js"
import axios from "axios"


function BeverageModal(props) {

  let port = useSelector((state)=> state.port)
  let Recipes = useSelector((state)=> state.recoRecipes)

  let beverages = []
  for (let i of port) {
    if(i.beverage_id >= 0){
      beverages.push(i.beverage_id)
    }
  }

  let Beverages = useSelector((state)=> state.beverage)

  const dispatch = useDispatch();

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
  const URL = 'http://i8a103.p.ssafy.io:3001'
  const getRecipes = () => {
      axios.get(URL+'/recipes',{params: {filter: beverages.join(",")}}).then((a)=>{
        dispatch(changeReco(setLengthIfLessFills(a.data.items, 3, {beverages_name: ""})));
      })
      .catch((e)=>{
        console.log("추천레시피 실패")
      })
    }
  



  return (
  <>
  <Box sx={style}>
    { Beverages.map(function(e, i){
    return (<div onClick={props.handleClose}><SulList onClick={()=>
      {dispatch(changePort({
      beverage_id : Beverages[i].beverage_id,
      beverage_image_url : Beverages[i].beverage_image_url,
      idx : props.index
    }))
    dispatch(changeBeverage({
      beverage_id : Beverages[i].beverage_id,
      idx : props.index
    }))
    getRecipes()
    console.log(">>>>>>>>>>><<<<<<<<<<<",Recipes)
  }
      }>{ Beverages[i].beverage_name }
    </SulList></div>)
    })}
    </Box>
  </>
  )
}

export default BeverageModal

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height : '70%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0 2px 4px, 0px 1px 2px inset',
  p: 2,
  borderRadius: '2vh',
  display : 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY : 'auto',
  background : '#004680f0',

};

const SulList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center ;
  margin: 1vh;
  padding: 1vh;
  border-radius : 1vh;
  color: #ffffff;
  font-size : 5vh;
  /* font-family: 'Jua', sans-serif; */
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.7));
  letter-spacing: 5px;
  `