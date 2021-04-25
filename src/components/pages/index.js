import { UserContext } from 'context/context'
import React, { useContext } from 'react'
import Home from './home'
import WaitingRoom from './waitingRoom'
import GameRoom from './gameRoom/index'
import { Box, Button } from '@material-ui/core'
function Pages() {
  const appState = useContext(UserContext).gameData.appState
  const userContext = useContext(UserContext)
  if (appState === -1)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="auto"
      >
        <p>!! for dev only !!</p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setGameData({ ...userContext.gameData, appState: 0 })
          }}
        >
          Home page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setGameData({ ...userContext.gameData, appState: 1 })
          }}
        >
          Waiting Room
        </Button>
        <p>GameRoom</p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setGameData({
              ...userContext.gameData,
              appState: 2,
              gameState: 0,
            })
          }}
        >
          Answer Page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setGameData({
              ...userContext.gameData,
              appState: 2,
              gameState: 1,
            })
          }}
        >
          Voting Page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setGameData({
              ...userContext.gameData,
              appState: 2,
              gameState: 2,
            })
          }}
        >
          Vote Result Page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setGameData({
              ...userContext.gameData,
              appState: 2,
              gameState: 3,
            })
          }}
        >
          Standing Page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setGameData({
              ...userContext.gameData,
              appState: 2,
              gameState: 4,
            })
          }}
        >
          Podium Page
        </Button>
      </Box>
    )
  if (appState === 1) return <WaitingRoom />
  if (appState === 2) return <GameRoom />
  return <Home />
}
export default Pages
