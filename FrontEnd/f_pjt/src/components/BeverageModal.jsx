import styled, {keyframes} from "styled-components";
import Box from '@mui/material/Box';
import { React } from 'react';
import { useSelector, useDispatch } from "react-redux"
import{ changePort, changeBeverage } from "../store.js"


// Ratio 를 이용한 
      // a===-1?{ 참 } :
      // {거짓}
function BeverageModal(props) {
  const ratio = useSelector((state)=> state.ratio)
  let port = useSelector((state)=> state.port)

  let beverages = []
  for (let i of port) {
    if(i.beverage_id >= 0){
      beverages.push(i.beverage_id)
    }
  }

  let Beverages = useSelector((state)=> state.beverage)

  const dispatch = useDispatch();
  return (
  <>
  <Box sx={style}>
    { Beverages.map(function(e, i){
  
      let a = ratio.findIndex((f)=>f.beverage_id === e.beverage_id)

      if(a!==-1 && ratio[a].beverage_id !== -1){
        // props.index 에 있는 음료를 a로 옮기고, props.index는 없애버리기
        
        return (<></>);
      }
      else{
        console.log( a)

   
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
  }
      }>{ i < 9 && <B1>{ Beverages[i].beverage_name }</B1>}
      { i >= 9 && i < 24 && <B2>{ Beverages[i].beverage_name }</B2>}
      { i === 24 && <B3>{ Beverages[i].beverage_name }</B3>}
    </SulList></div>)}
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
  boxShadow: '0 2px 4px',
  p: '4vh',
  borderRadius: '2vh',
  display : 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY : 'auto',
  background : '#f0eee9f4',
};

const SulList = styled.div
  
const shiny = keyframes`
0% { -webkit-transform: scale(0) rotate(45deg); opacity: 0; }
80% { -webkit-transform: scale(0) rotate(45deg); opacity: 0.5; }
81% { -webkit-transform: scale(4) rotate(45deg); opacity: 1; }
100% { -webkit-transform: scale(50) rotate(45deg); opacity: 0; }
`
  const B1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center ;
  min-width: 5vw;
  margin: 1vh;
  padding: 1.1vh 2.5vh;
  border-radius : 100vh;
  color: #ffffff;
  filter: drop-shadow(1px 2px 1px rgb(0 0 0 / 0.2));
  font-size : 4.5vh;
  font-family: 'Jua', sans-serif;
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
  letter-spacing: 5px;
  border: none;
  background: #F7CAC9;
  /* background: #89ABE3; */
  overflow: hidden;
  &:hover {
    text-decoration: none;
    color : #fff;
    opacity: .7;
}
  &:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #ffffff55;
    animation: ${shiny} 5s ease-in-out infinite;
}
`
const B2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center ;
  min-width: 5vw;
  margin: 1vh;
  padding: 1.1vh 2.5vh;
  border-radius : 100vh;
  color: #ffffff;
  filter: drop-shadow(1px 2px 1px rgb(0 0 0 / 0.2));
  font-size : 4.5vh;
  font-family: 'Jua', sans-serif;
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
  letter-spacing: 5px;
  border: none;
  /* background: #F7CAC9; */
  background: #89ABE3;
  overflow: hidden;
  &:hover {
    text-decoration: none;
    color : #fff;
    opacity: .7;
}
  &:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #ffffff55;
    animation: ${shiny} 5s ease-in-out infinite;
}
`

const B3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center ;
  min-width: 5vw;
  margin: 1vh;
  padding: 1.1vh 2.5vh;
  border-radius : 100vh;
  color: #ffffff;
  filter: drop-shadow(1px 2px 1px rgb(0 0 0 / 0.2));
  font-size : 4.5vh;
  font-family: 'Jua', sans-serif;
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
  letter-spacing: 5px;
  border: none;
  /* background: #F7CAC9; */
  background: #89ABE3;
  overflow: hidden;
  &:hover {
    text-decoration: none;
    color : #fff;
    opacity: .7;
}
  &:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #ffffff55;
    animation: ${shiny} 5s ease-in-out infinite;
}
`