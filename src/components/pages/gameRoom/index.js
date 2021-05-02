import Loading from 'components/common/Loading'
import React from 'react'
import { useAppController } from 'utils/appController'
import Answer from './Answer'
import Podium from './Podium'
import Standing from './Standing'
import VoteResult from './VoteResult'
import Voting from './Voting'
function GameRoom() {
  const gameState = useAppController().gameState
  if (gameState === 'answer') return <Answer />
  if (gameState === 'voting') return <Voting />
  if (gameState === 'result') return <VoteResult />
  if (gameState === 'score') return <Standing />
  if (gameState === 'podium') return <Podium />
  return <Loading />
}
export default GameRoom
