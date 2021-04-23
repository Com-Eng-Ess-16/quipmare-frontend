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
  // const [player, setPlayer] = useState(null)
  const [player, setPlayer] = useState({
    1: 'PKhing',
    2: 'Palmcm',
    3: 'luangjay',
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

export { UserContext, UserProvider, PlayerContext, PlayerProvider }
