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
import { useContext, useState } from 'react'
import ColorInput from './ColorInput'
import { PlayerContext } from 'context/context'
import { useProfileStyles } from '../styles'
import { useColor } from 'utils/colorUtil'
import Loading from 'components/common/Loading'

function Profile({ action, joinRoom }) {
  const styles = useProfileStyles()
  const [username, setUsername] = useState('')
  const [color, setColor] = useState(-1)
  const playerContext = useContext(PlayerContext)
  const [isBlank, setBlank] = useState(false)
  const getColor = useColor()

  if (playerContext.player === null) return <Loading />
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
                setUsername(event.target.value)
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
                style={{ backgroundColor: getColor(color).light }}
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
                  joinRoom(null, username, color)
                }}
                variant="contained"
              >
                Confirm
              </Button>
            </CardActions>
          </Card>
          <div className={styles.playerCount}>
            <Avatar className={styles.playerCountAvatar}>
              {playerContext.player
                ? Object.keys(playerContext.player).length
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
