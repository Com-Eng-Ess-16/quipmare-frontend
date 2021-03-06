import { useError } from 'components/common/Error'
import { PlayerContext, UserContext } from 'context/context'
import { useContext } from 'react'
import {
  getCreateRoom,
  getIsRoomExist,
  postJoinRoom,
  postStartGame,
  deleteKickPlayer,
} from './apiService'
import { useColor } from './colorUtil'
import { useListener } from './firebaseUtil'
import { useGameUtil } from './gameUtil'

export function useAppController() {
  const userContext = useContext(UserContext)
  const playerContext = useContext(PlayerContext)
  const listener = useListener()
  const setError = useError()
  const getColor = useColor()
  const gameUtil = useGameUtil()

  const createRoom = async (setAction) => {
    try {
      const roomCode = await getCreateRoom()
      setAction('create')
      userContext.setRoomCode(roomCode)
      listener.addPlayerListenerSpectator(roomCode)
    } catch (err) {
      setError(err)
    }
  }

  const checkRoom = async (roomCode, action) => {
    try {
      const res = await getIsRoomExist(roomCode)
      if (res) {
        userContext.setRoomCode(roomCode)
        listener.addPlayerListenerSpectator(roomCode)
        if (action === 'spectate') joinRoom(roomCode, '', 1, action)
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
      if (res.playerId !== null && res.playerId !== undefined) {
        listener.addPlayerListener(roomCode, res.playerId)
      }
      userContext.setUserID(
        res.playerId !== null && res.playerId !== undefined
          ? res.playerId
          : res.spectateId
      )
      if (res.username) {
        userContext.setUsername(res.username)
      }
      userContext.setUserType(res.type)
      listener.addRoomStateListener(
        roomCode,
        res.playerId !== null && res.playerId !== undefined
          ? res.playerId
          : null
      )
    } catch (err) {
      setError(err)
    }
  }

  const kickPlayer = async (playerID) => {
    if (userContext.userType === 'spectate') {
      listener.closeListener(userContext.roomCode)
      userContext.reset()
      playerContext.reset()
    }

    if (playerID === null || playerID === undefined)
      playerID = userContext.userID
    try {
      await deleteKickPlayer(userContext.roomCode, playerID)
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
    ...gameUtil,
    getColor,
    createRoom,
    joinRoom,
    checkRoom,
    startGame,
    kickPlayer,
  }
}
