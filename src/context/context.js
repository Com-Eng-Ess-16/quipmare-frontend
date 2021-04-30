import React, { createContext, useState } from 'react'
const UserContext = createContext()
function UserProvider(props) {
  const [userID, setUserID] = useState(-1)
  const [userType, setUserType] = useState(null)
  const [roomCode, setRoomCode] = useState(null)
  const [roomState, setRoomState] = useState(-1) // change to null later
  const [gameState, setGameState] = useState(-1)
  const [gameID, setGameID] = useState(null)
  const [score, setScore] = useState(0)
  const [gameData, setGameData] = useState({
    currentQuestionID: -1,
    countdownEnd: '2021-04-23T12:15:00+07:00',
  }) // change to null later
  const reset = () => {
    setUserID(-1)
    setUserType(null)
    setRoomCode(null)
    setRoomState(null)
    setGameState(-1)
    setGameData(null)
    setGameID(null)
    setScore(0)
  }
  return (
    <UserContext.Provider
      value={{
        userID,
        setUserID,
        userType,
        setUserType,
        gameData,
        setGameData,
        roomCode,
        setRoomCode,
        roomState,
        setRoomState,
        gameState,
        setGameState,
        gameID,
        setGameID,
        score,
        setScore,
        reset,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

const PlayerContext = createContext()
function PlayerProvider(props) {
  const [player, setPlayer] = useState({
    0: {
      username: 'user0',
      color: 0,
    },
    1: {
      username: 'user1',
      color: 1,
    },
  }) //change to null later
  const reset = () => {
    setPlayer(null)
  }
  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        reset,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}
const ErrorContext = createContext()
function ErrorProvider(props) {
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
        open,
        setOpen,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  )
}
export {
  UserContext,
  UserProvider,
  PlayerContext,
  PlayerProvider,
  ErrorContext,
  ErrorProvider,
}
