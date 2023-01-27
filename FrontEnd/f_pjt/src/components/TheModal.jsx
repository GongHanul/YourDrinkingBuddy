import React, { useState } from "react";
import styled from "styled-components";
import ModalContainer from "./Modal/ModalContainer";

function Modal({ onClose }) {
    const handleClose = () => {
      onClose?.();
    };
    let [beverage, setBerverage] = useState(['소주', '맥주'])
    return (
        <ModalContainer>
            <Overlay>
            <ModalWrap>
                <CloseButton onClick={handleClose}>
                <i className="fa-solid fa-xmark"></i>
                </CloseButton>
                <Contents>
                { beverage.map(function(e, i){
                  return (<Beverage> { beverage[i] }</Beverage>)
                }) }
                
                <Button onClick={handleClose}>Close</Button>
                </Contents>
            </ModalWrap>
            </Overlay>
        </ModalContainer>
    );
  }
  
  const Beverage = styled.div`
    border: 1rem;
    background-color: gray;
  `

  const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 9999;
  `;
  
  const ModalWrap = styled.div`
    width: 60vh;
    height: fit-content;
    border-radius: 15px;
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.45);
  `;
  
  const CloseButton = styled.div`
    float: right;
    width: 40px;
    height: 40px;
    margin: 20px;
    cursor: pointer;
    i {
      color: #5d5d5d;
      font-size: 30px;
    }
  `;
  
  const Contents = styled.div`
    margin: 50px 30px;
    h1 {
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 60px;
    }
    img {
      margin-top: 60px;
      width: 300px;
    }
  `;
  const Button = styled.button`
    font-size: 14px;
    padding: 10px 20px;
    border: none;
    background-color: #ababab;
    border-radius: 10px;
    color: white;
    font-style: italic;
    font-weight: 200;
    cursor: pointer;
    &:hover {
      background-color: #898989;
    }
  `;
  export default Modal;