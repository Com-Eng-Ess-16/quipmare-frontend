import React, { createContext, useState } from 'react'
const UserContext = createContext()
function UserProvider(props) {
  const [userID, setUserID] = useState(-1)
  const [roomCode, setRoomCode] = useState(null)
  const [gameData, setGameData] = useState({
    appState: -1,
    gameState: -1,
    currentQuestionID: -1,
    countdownEnd: '2021-04-23T12:15:00+07:00',
  })
  return (
    <UserContext.Provider
      value={{
        userID,
        setUserID,
        gameData,
        setGameData,
        roomCode,
        setRoomCode,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

const PlayerContext = createContext()
function PlayerProvider(props) {
  const [player, setPlayer] = useState({
    1: 'PKhing',
    2: 'Palmcm',
    3: 'luangjay',
    4: 'LorkLuang',
    5: 'Lunar',
    6: 'Lucia',
    7: 'Dreams'
  })
  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
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
