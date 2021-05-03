import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActions,
  Box,
} from '@material-ui/core'
import { useState } from 'react'
import ColorInput from './ColorInput'
import { useProfileStyles } from '../styles'
import Loading from 'components/common/Loading'
import { useAppController } from 'utils/appController'

function Profile({ action }) {
  const styles = useProfileStyles()
  const [username, setUsername] = useState('')
  const [color, setColor] = useState(-1)
  const [isBlank, setBlank] = useState(false)
  const appController = useAppController()

  if (appController.player === null) return <Loading />
  if (action === 'spectate') return <Loading />
  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        <Card className={styles.inputCard}>
          <CardContent className={styles.inputCardContent}>
            <Typography className={styles.text}>Username</Typography>
            <TextField
              error={isBlank}
              className={styles.usernameField}
              value={username}
              InputProps={{
                className: styles.textFieldFont,
              }}
              onChange={(event) => {
                const regex = /^[A-Za-z0-9]+$/
                if (
                  regex.test(event.target.value) &&
                  event.target.value.length <= 12
                )
                  setUsername(event.target.value.toUpperCase())
                if (username !== '') setBlank(false)
              }}
            />
            <ColorInput
              className={styles.colorInput}
              color={color}
              setColor={setColor}
            />
          </CardContent>
        </Card>
        <div className={styles.rightSide}>
          <Card className={styles.profileCard}>
            <CardContent className={styles.textContainer}>
              <Typography className={styles.text}>Profile</Typography>
            </CardContent>
            <CardContent className={styles.avatarContainer}>
              <Avatar
                style={{ backgroundColor: appController.getColor(color).light }}
                className={styles.profileAvatar}
              >
                {username}
              </Avatar>
            </CardContent>
            <CardActions className={styles.profileCardActions}>
              <Button
                className={styles.confirmButton}
                onClick={() => {
                  if (username === '') {
                    setBlank(true)
                    return
                  }
                  appController.joinRoom(null, username, color, action)
                }}
                variant="contained"
              >
                Confirm
              </Button>
            </CardActions>
          </Card>
          <div className={styles.playerCount}>
            <Avatar className={styles.playerCountAvatar}>
              {appController.player
                ? Object.keys(appController.player).length
                : 0}
            </Avatar>
            <Box display="flex" flexDirection="column">
              <Typography className={styles.playerCountText}>
                players
              </Typography>
              <Typography className={styles.playerCountText}>
                waiting...
              </Typography>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
