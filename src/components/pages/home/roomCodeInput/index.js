import { Button, TextField, Typography } from '@material-ui/core'
import { useContext, useState } from 'react'
import { getIsRoomExist } from 'utils/apiService'
import { addPlayerListener } from 'utils/firebaseUtil'
import { PlayerContext, UserContext } from 'context/context'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  joinText: {
    fontFamily: 'Architects Daughter',
    marginTop: '12.5vh'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '30vw'
  },
  roomCodeInput: {
    marginTop: '15vh',
    width: '400px',
    marginBottom: '15vh'
  },
  button: {
    fontSize: '2.5rem',
    fontFamily: 'Architects Daughter',
    width: '250px',
    height: '100px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: '2px solid black',
    marginRight: '40px'
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
    <>
      <Typography className={styles.joinText} variant='h3'>{action.action.toUpperCase()+' A ROOM'}</Typography>
      <div>
        <TextField className={styles.roomCodeInput}
          label="room code"
          value={roomCode}
          onChange={(event) => {
          setRoomCode(event.target.value)
            }}
        />
        </div>
      <div className={styles.buttons}>
        <Button className={styles.button} onClick={joinRoom} variant="contained">JOIN</Button>
        <Button className={styles.button} variant="contained">LEAVE</Button>
      </div>
    </>
  )
}
export default RoomCodeInput
