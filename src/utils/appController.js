import { useError } from 'components/common/Error'
import { PlayerContext, UserContext } from 'context/context'
import { useContext } from 'react'
import {
  getCreateRoom,
  getIsRoomExist,
  postJoinRoom,
  postStartGame,
} from './apiService'
import { useColor } from './colorUtil'
import { useListener } from './firebaseUtil'

export function useAppController() {
  const userContext = useContext(UserContext)
  const playerContext = useContext(PlayerContext)
  const listener = useListener()
  const setError = useError()
  const getColor = useColor()

  const createRoom = async (setAction) => {
    try {
      const roomCode = await getCreateRoom()
      setAction('create')
      userContext.setRoomCode(roomCode)
      listener.addPlayerListener(roomCode)
    } catch (err) {
      setError(err)
    }
  }

  const checkRoom = async (roomCode, action) => {
    try {
      const res = await getIsRoomExist(roomCode)
      if (res) {
        userContext.setRoomCode(roomCode)
        listener.addPlayerListener(roomCode)
        if (action === 'spectate') joinRoom(roomCode, '', 1)
      } else {
        setError({ response: { data: 'Invalid Room' } })
      }
    } catch (err) {
      setError(err)
    }
  }

  const joinRoom = async (roomCode, username, color, action) => {
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
              data: 'The room is full! You will become a spectator',
            },
          })
        } else {
          setError({
            response: {
              data: 'The game has already started! You will become a spectator',
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

  const startGame = async () => {
    try {
      await postStartGame(userContext.roomCode)
    } catch (err) {
      setError(err)
    }
  }

  return {
    ...userContext,
    ...playerContext,
    getColor,
    createRoom,
    joinRoom,
    checkRoom,
    startGame,
  }
}
