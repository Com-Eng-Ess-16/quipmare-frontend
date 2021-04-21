import React, { createContext, useState } from 'react'
const UserContext = createContext()
function UserProvider(props) {
  const [userID, setUserID] = useState(-1)
  const [username, setUsername] = useState(null)
  const [roomCode, setRoomCode] = useState(null)
  const [gameData, setGameData] = useState({
    appState: -1,
    gameState: -1,
    currentQuestionID: -1,
  })
  return (
    <UserContext.Provider
      value={{
        userID,
        setUserID,
        username,
        setUsername,
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

const MemberContext = createContext()
function MemberProvider(props) {
  const [member, setMember] = useState(null)
  return (
    <MemberContext.Provider
      value={{
        member,
        setMember,
      }}
    >
      {props.children}
    </MemberContext.Provider>
  )
}

export { UserContext, UserProvider, MemberContext, MemberProvider }
