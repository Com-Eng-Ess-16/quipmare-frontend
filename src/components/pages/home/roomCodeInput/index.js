import { Button, TextField } from '@material-ui/core'
import { useContext, useState } from 'react'
import { getIsRoomExist } from 'utils/apiService'
import { addPlayerListener } from 'utils/firebaseUtil'
import { PlayerContext, UserContext } from 'context/context'
function RoomCodeInput(action) {
  const playerContext = useContext(PlayerContext)
  const userContext = useContext(UserContext)
  const [roomCode, setRoomCode] = useState('')
  const joinRoom = async () => {
    const res = await getIsRoomExist(roomCode)
    if (res) {
      addPlayerListener(roomCode, playerContext)
      userContext.setRoomCode(roomCode)
    }
  }
  return (
    <>
      <TextField
        label="room code"
        value={roomCode}
        onChange={(event) => {
          setRoomCode(event.target.value)
        }}
      />
      <Button onClick={joinRoom}>join</Button>
    </>
  )
}
export default RoomCodeInput
