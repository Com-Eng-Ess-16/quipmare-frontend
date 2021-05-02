import React, { createContext, useState } from 'react'
const UserContext = createContext()
function UserProvider(props) {
  const [userID, setUserIDState] = useState(-1)
  const [userType, setUserTypeState] = useState(null)
  const [roomCode, setRoomCodeState] = useState(null)
  const [roomState, setRoomState] = useState(-1) // change to null later
  const [gameState, setGameState] = useState(-1)
  const [gameID, setGameID] = useState(null)
  const [score, setScore] = useState(0)
  const [username, setUsername] = useState(null)
  const [countdownEnd, setCountdownEnd] = useState(null)

  const setRoomCode = (roomCode) => {
    setRoomCodeState(roomCode)
    localStorage.setItem('roomCode', roomCode)
  }
  const setUserType = (type) => {
    setUserTypeState(type)
    localStorage.setItem('userType', type)
  }
  const setUserID = (id) => {
    setUserIDState(id)
    localStorage.setItem('userID', id)
  }
  const reset = () => {
    setUserID(-1)
    setUserType(null)
    setRoomCode(null)
    setRoomState(null)
    setGameState(-1)
    setGameID(null)
    setUsername(null)
    setScore(0)
    setCountdownEnd(null)
  }
  return (
    <UserContext.Provider
      value={{
        userID,
        setUserID,
        userType,
        setUserType,
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
        username,
        setUsername,
        countdownEnd,
        setCountdownEnd,
        reset,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

const PlayerContext = createContext()
function PlayerProvider(props) {
  const [player, setPlayer] = useState(null)
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
