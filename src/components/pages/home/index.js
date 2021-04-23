import { Button } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { addPlayerListener } from 'utils/firebaseUtil'
import { getCreateRoom } from 'utils/apiService'
import Profile from './profile'
import RoomCodeInput from './roomCodeInput'
import { PlayerContext, UserContext } from 'context/context'

function Home() {
  const userContext = useContext(UserContext)
  const [action, setAction] = useState('')
  const playerContext = useContext(PlayerContext)
  const createRoom = async () => {
    const res = await getCreateRoom()
    setAction('create')
    addPlayerListener(res.roomCode, playerContext)
    userContext.setRoomCode(res.roomCode)
  }

  if (action === '')
    return (
      <>
        <Button onClick={() => setAction('join')}>join</Button>
        <Button onClick={() => setAction('spectate')}>spectate</Button>
        <Button onClick={createRoom}>host</Button>
      </>
    )
  if (userContext.roomCode !== null) return <Profile action={action} />
  if (action === 'join' || action === 'spectate')
    return <RoomCodeInput action={action} />
  return <></>
}
export default Home
