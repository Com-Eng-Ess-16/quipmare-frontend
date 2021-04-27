import { Button, TextField, Typography } from '@material-ui/core'
import { useContext, useState } from 'react'
import { getIsRoomExist, postJoinRoom } from 'utils/apiService'
import { useListener } from 'utils/firebaseUtil'
import { UserContext } from 'context/context'
import { makeStyles } from '@material-ui/core'
import { useError } from 'components/common/Error'

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '10vh 5vw 0 5vw',
  },
  actionText: {
    fontFamily: 'Architects Daughter',
    fontSize: '3.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.9rem',
    },
  },
  roomCodeInput: {
    margin: '10vh 0 20vh 0',
    width: '60%',
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      margin: '10vh 0 15vh 0',
    },
  },
  buttons: {
    marginLeft: '60%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginLeft: '50%',
    },
  },
  button: {
    fontSize: '1.5rem',
    fontFamily: 'Architects Daughter',
    width: '15vw',
    marginLeft: '13%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: '2px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      border: '2px solid ' + theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      fontSize: '1rem',
      margin: '20% 0 0% 0%',
    },
  },
  textFieldFont: {
    fontSize: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
}))

function RoomCodeInput(props) {
  const { action, setAction } = props
  const styles = useStyles()
  const setError = useError()
  const userContext = useContext(UserContext)
  const [roomCode, setRoomCode] = useState('')
  const [isBlank, setBlank] = useState(false)
  const listener = useListener()
  const checkRoom = async () => {
    if (roomCode === '') {
      setBlank(true)
      return
    }
    try {
      const res = await getIsRoomExist(roomCode)
      if (res) {
        userContext.setRoomCode(roomCode)
        listener.addPlayerListener(roomCode)
        if (action === 'spectate') joinRoom(roomCode)
      } else {
        // eslint-disable-next-line no-throw-literal
        throw { response: { statusText: 'Invalid Room' } }
      }
    } catch (err) {
      setError(err)
    }
  }

  const joinRoom = async (roomCode) => {
    try {
      const res = await postJoinRoom(roomCode, '', 0, 'spectator')
      userContext.setUserID(res.spectateId)
      userContext.setUserType(res.type)
      userContext.setGameData({
        ...userContext.gameData,
        appState: 1,
      })
    } catch (err) {
      setError(err)
    }
  }
  return (
    <div className={styles.page}>
      <Typography className={styles.actionText}>
        {action.toUpperCase() + ' A ROOM'}
      </Typography>
      <div>
        <TextField
          className={styles.roomCodeInput}
          error={isBlank}
          label="room code"
          value={roomCode}
          style={{
            fontSize: '3rem',
          }}
          InputProps={{
            className: styles.textFieldFont,
            style: {
              marginTop: '30px',
            },
          }}
          InputLabelProps={{
            className: styles.textFieldFont,
          }}
          onChange={(event) => {
            setRoomCode(event.target.value)
            if (roomCode !== '') setBlank(false)
          }}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          onClick={checkRoom}
          variant="contained"
        >
          JOIN
        </Button>
        <Button
          className={styles.button}
          variant="contained"
          onClick={() => {
            setAction('')
          }}
        >
          LEAVE
        </Button>
      </div>
    </div>
  )
}
export default RoomCodeInput
