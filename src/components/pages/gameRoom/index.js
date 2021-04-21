import { UserContext } from 'context/context'
import React, { useContext } from 'react'
import Answer from './Answer'
import Podium from './Podium'
import Standing from './Standing'
import Voting from './Voting'
function GameRoom() {
  const gameState = useContext(UserContext).gameData.gameState
  if (gameState === 0) return <Answer />
  if (gameState === 1) return <Voting />
  if (gameState === 2) return <Standing />
  if (gameState === 3) return <Podium />
  return <></>
}
export default GameRoom
