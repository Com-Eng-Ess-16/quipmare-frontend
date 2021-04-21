import { Button, TextField } from '@material-ui/core'
import { UserContext } from 'context/context'
import React, { useContext, useState } from 'react'
import { addListener } from 'utils/firebaseUtil'
import { postCreateRoom, postJoinRoom } from './../../../utils/apiService'

function Home() {
  const [username, setUsername] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [error, setError] = useState([false, false])
  const userContext = useContext(UserContext)

  const createRoom = async () => {
    if (username === '') {
      setError([username === '', false])
      return
    }
    const res = await postCreateRoom(username)
    addListener(res.userID, res.roomCode, res.username, userContext)
  }

  const joinRoom = async () => {
    if (username === '' || roomCode === '') {
      setError([username === '', roomCode === ''])
      return
    }
    const res = await postJoinRoom(username)
    addListener(res.userID, res.roomCode, res.username, userContext)
  }
  return (
    <div>
      <TextField
        error={error[0]}
        label="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value)
        }}
      ></TextField>
      <TextField
        error={error[1]}
        label="room code"
        value={roomCode}
        onChange={(event) => {
          setRoomCode(event.target.value)
        }}
      ></TextField>
      <Button variant="contained" color="primary" onClick={createRoom}>
        Create Room
      </Button>

      <Button variant="contained" color="primary" onClick={joinRoom}>
        Join Room
      </Button>
    </div>
  )
}
export default Home
