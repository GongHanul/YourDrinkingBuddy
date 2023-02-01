import styled from "styled-components";
import { React, useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux"


function BeverageListModal() {

  let Beverages = useSelector((state)=> state.beverage)
  return (
    <>
    <Box sx={style}>
      { Beverages.map(function(e, i){
      return (<SulList>{ Beverages[i].beverage_name }</SulList>
      // <img src="{Beverages[i].beverage_image_url}"></img>
          )
      })}
      </Box>
    </>
  )
}

export default BeverageListModal

const Beverage = styled.div`
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  height: '50vh',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '2vh',
  display : 'flex',
  flexWrap: 'wrap',
};

const SulList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center ;
  margin: 2vh;
  padding: 1em;
  box-shadow:  1px 1px 1px darkgray, 0px 0px 2px inset;
  border-radius : 5em;
  font-weight : bold;   
  `