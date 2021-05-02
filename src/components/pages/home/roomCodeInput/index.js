import { Button, TextField, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useAppController } from 'utils/appController'
import { useRoomCodeInputStyles } from '../styles'

function RoomCodeInput({ action, setAction }) {
  const styles = useRoomCodeInputStyles()
  const appController = useAppController()
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
            if (event.target.value.length <= 6)
              setRoomCode(event.target.value.toUpperCase())
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
            appController.checkRoom(roomCode, action)
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
