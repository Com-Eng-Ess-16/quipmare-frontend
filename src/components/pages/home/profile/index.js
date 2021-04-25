import { Button, TextField } from '@material-ui/core'
import { useContext, useState } from 'react'
import { postJoinRoom } from 'utils/apiService'
import { addListener } from 'utils/firebaseUtil'
import ColorInput from './ColorInput'
import { UserContext } from 'context/context'

function Profile(action) {
  const [username, setUsername] = useState('')
  const [color, setColor] = useState('0')
  const userContext = useContext(UserContext)
  const joinRoom = async () => {
    const res = await postJoinRoom(
      userContext.roomCode,
      username,
      color,
      action
    )
    userContext.setUserID(res.userID)
    addListener(res.userID, userContext.roomCode, userContext)
  }
  return (
    <>
      <TextField
        label="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value)
        }}
      />
      <ColorInput color={color} setColor={setColor} />
      <Button onClick={joinRoom}>Confirm</Button>
    </>
  )
}
export default Profile
