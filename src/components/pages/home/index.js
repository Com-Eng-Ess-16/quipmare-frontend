import { Button, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { useListener } from 'utils/firebaseUtil'
import { getCreateRoom, getIsRoomExist, postJoinRoom } from 'utils/apiService'
import Profile from './profile'
import RoomCodeInput from './roomCodeInput'
import { PlayerContext, UserContext } from 'context/context'
import { useError } from 'components/common/Error'
import { useIndexStyles } from './styles'

function Home() {
  const styles = useIndexStyles()
  const userContext = useContext(UserContext)
  const playerContext = useContext(PlayerContext)
  const [action, setAction] = useState('')
  const setError = useError()
  const listener = useListener()

  const createRoom = async () => {
    try {
      const roomCode = await getCreateRoom()
      setAction('create')
      userContext.setRoomCode(roomCode)
      listener.addPlayerListener(roomCode)
    } catch (err) {
      setError(err)
    }
  }

  const checkRoom = async (roomCode) => {
    try {
      const res = await getIsRoomExist(roomCode)
      if (res) {
        userContext.setRoomCode(roomCode)
        listener.addPlayerListener(roomCode)
        if (action === 'spectate') joinRoom(roomCode, '', 1)
      } else {
        // eslint-disable-next-line no-throw-literal
        throw { response: { statusText: 'Invalid Room' } }
      }
    } catch (err) {
      setError(err)
    }
  }

  const joinRoom = async (roomCode, username, color) => {
    if (!roomCode) roomCode = userContext.roomCode
    try {
      const res = await postJoinRoom(roomCode, username, color, action)
      if (res.type === 'spectate' && action !== 'spectate') {
        if (
          (playerContext.player
            ? Object.keys(playerContext.player).length
            : 0) === 8
        ) {
          setError({
            response: {
              statusText: 'The room is full! You will become a spectator',
            },
          })
        } else {
          setError({
            response: {
              statusText:
                'The game has already started! You will become a spectator',
            },
          })
        }
      }
      userContext.setUserID(
        res.playerId !== null ? res.playerId : res.spectateId
      )
      userContext.setUserType(res.type)
      userContext.setGameData({
        ...userContext.gameData,
        appState: 1,
      })
      listener.addRoomStateListener(roomCode)
    } catch (err) {
      setError(err)
    }
  }

  if (action === '')
    return (
      <div className={styles.page}>
        <div>
          <Typography className={styles.gameTitle}>
            The Greatest Jester
          </Typography>
        </div>
        <div className={styles.buttons}>
          <Button
            className={styles.joinButton}
            color="primary"
            variant="outlined"
            onClick={() => setAction('join')}
          >
            join
          </Button>
        </div>
        <div className={styles.buttons}>
          <Button
            className={styles.spectateButton}
            color="primary"
            variant="outlined"
            onClick={() => setAction('spectate')}
          >
            spectate
          </Button>
          <Button
            className={styles.hostButton}
            color="primary"
            variant="outlined"
            onClick={createRoom}
          >
            host
          </Button>
        </div>
      </div>
    )
  if (userContext.roomCode !== null)
    return <Profile action={action} joinRoom={joinRoom} />
  if (action === 'join' || action === 'spectate')
    return (
      <RoomCodeInput
        action={action}
        setAction={setAction}
        checkRoom={checkRoom}
      />
    )
  return <></>
}
export default Home
