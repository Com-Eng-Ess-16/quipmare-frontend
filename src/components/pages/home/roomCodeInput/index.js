import { Button, TextField, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useRoomCodeInputStyles } from '../styles'

function RoomCodeInput({ action, setAction, checkRoom }) {
  const styles = useRoomCodeInputStyles()
  const [roomCode, setRoomCode] = useState('')
  const [isBlank, setBlank] = useState(false)

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
          onClick={() => {
            if (roomCode === '') {
              setBlank(true)
              return
            }
            checkRoom(roomCode)
          }}
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
