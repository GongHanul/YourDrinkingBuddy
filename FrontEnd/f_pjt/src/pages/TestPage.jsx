import styled from "styled-components";
import { React } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { preserveGameDataHandler, setGameDataHandler, setGameStatePlay } from "../store";
import DummyGameDataHandler from '../handler/DummyGameDataHandler'

function MessageComponent(){
  const game = useSelector((state) => state.game);
  return(
    <Chat>
      <Messages>
        {
          console.log(game)}{
            game.gameData.messages.map(function(message){
              return(<Message>{message}</Message>)
            })
        }
      </Messages>
    </Chat>
  )
}

function TestPage(){
  const dispatch = useDispatch();
  preserveGameDataHandler(new DummyGameDataHandler())
  dispatch(setGameDataHandler())
  dispatch(setGameStatePlay())

  return(
    <MessageComponent/>
  )
}

const Chat = styled.div`
  margin: 0; 
  padding-bottom: 3rem; 
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`

const Messages = styled.ul`
  list-style-type: none; margin: 0; padding: 0;
`

const Message = styled.li`
  padding: 0.5rem 1rem;
`

export default TestPage
