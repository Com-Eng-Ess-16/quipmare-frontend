import { Button, TextField, Typography } from '@material-ui/core'
import { useContext, useState } from 'react'
import { getIsRoomExist } from 'utils/apiService'
import { addPlayerListener } from 'utils/firebaseUtil'
import { PlayerContext, UserContext } from 'context/context'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '10vh 5vw 0 5vw'
  },
  actionText: {
    fontFamily: 'Architects Daughter',
    fontSize: '3.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.9rem'
    }
  },
  roomCodeInput: {
    margin: '10vh 0 20vh 0',
    width: '60%',
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      margin: '10vh 0 15vh 0'
    }
  },
  buttons: {
    marginLeft: '60%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginLeft: '50%'
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
      border: '2px solid '+theme.palette.primary.main
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      fontSize: '1rem',
      margin: '20% 0 0% 0%'
    },
  },
  textFieldFont: {
    fontSize: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    }
  } 
}))

function RoomCodeInput(action) {
  const styles = useStyles()
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
    <div className={styles.page}>
      <Typography className={styles.actionText}>{action.action.toUpperCase()+' A ROOM'}</Typography>
      <div>
        <TextField 
          className={styles.roomCodeInput}
          label="room code"
          value={roomCode}
          style={{
            fontSize: '3rem'
          }}
          InputProps={{
            className: styles.textFieldFont,
          }}
          onChange={(event) => {
          setRoomCode(event.target.value)
            }}
        />
        </div>
      <div className={styles.buttons}>
          <Button className={styles.button} onClick={joinRoom} variant="contained">JOIN</Button>
          <Button className={styles.button} variant="contained">LEAVE</Button>
      </div>
    </div>
  )
}
export default RoomCodeInput
