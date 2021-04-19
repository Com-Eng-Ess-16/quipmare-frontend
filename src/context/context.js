import React, { createContext, useState } from 'react'
const UserContext = createContext()
function UserProvider(props) {
  const [username, setUsername] = useState('')
  const [appState, setAppState] = useState(-1)
  const [gameState, setGameState] = useState(0)
  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        appState,
        setAppState,
        gameState,
        setGameState,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
