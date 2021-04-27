import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardActions,
} from '@material-ui/core'
import { useContext, useState } from 'react'
import { postJoinRoom } from 'utils/apiService'
import ColorInput from './ColorInput'
import { UserContext } from 'context/context'
import { makeStyles } from '@material-ui/core'
import { useError } from 'components/common/Error'

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '2vh 0 2vh 0',
    [theme.breakpoints.down('md')]: {
      margin: '1vh 1vw 1vh 1vw',
    },
  },
  cards: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  inputCard: {
    border: '1px solid black',
    width: '60%',
    [theme.breakpoints.down('md')]: {
      marginBottom: '4%',
      width: '100%',
    },
  },
  inputCardContent: {
    margin: '-2% 0 0 3%',
  },
  text: {
    textShadow: '1px 1px #00000020',
    fontSize: '4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  usernameField: {
    width: '80%',
    margin: '0% 0 7% 0',
    [theme.breakpoints.down('sm')]: {
      margin: '0% 0 3% 0',
    },
  },
  rightSide: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '5%',
      width: '30%',
      height: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '3% 0 0 0',
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '5% 0 0 0',
      display: 'flex',
      width: '100%',
      height: '36vh',
    },
  },
  profileCard: {
    border: '1px solid black',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  textContainer: {
    margin: '-2% 0 0 3%',
    [theme.breakpoints.down('sm')]: {
      margin: '-2% 0 -10% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '-2% 0 -12% 3%',
    },
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  profileAvatar: {
    border: '1px solid black',
    width: '23vh',
    height: '23vh',
    [theme.breakpoints.down('sm')]: {
      width: '14vh',
      height: '14vh',
    },
  },
  profileCardActions: {
    justifyContent: 'center',
  },
  confirmButton: {
    fontFamily: 'Architects Daughter',
    fontSize: '1.2rem',
    width: '65%',
    margin: '10% 0 10% 0',
    border: '2px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      border: '2px solid ' + theme.palette.primary.main,
    },
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      margin: '-5% 0 -1% 0',
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '-7% 0 5% 0',
      fontSize: '0.75rem',
    },
  },
  playerCount: {
    margin: '20% 0 0 60%',
    [theme.breakpoints.down('sm')]: {
      margin: '35% 0 0 5vw',
    },
  },
  playerCountText: {
    fontFamily: 'Architects Daughter',
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
  textFieldFont: {
    fontSize: '2.25rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
}))

function Profile(props) {
  const styles = useStyles()
  const setError = useError()
  const [username, setUsername] = useState('')
  const [color, setColor] = useState('0')
  const userContext = useContext(UserContext)
  const joinRoom = async () => {
    try {
      const res = await postJoinRoom(
        userContext.roomCode,
        username,
        color === -1 ? Math.floor(Math.random() * 8) : color,
        'player'
      )
      if (res.type === 'spectate') {
        setError({
          response: {
            statusText: 'The room is full! You will become a spectator',
          },
        })
      }
      userContext.setUserID(res.playerId ? res.playerId : res.spectateId)
      userContext.setUserType(res.type)
      userContext.setGameData({
        ...userContext.gameData,
        appState: 1,
      })
    } catch (err) {
      setError(err)
    }
  }
  if (props.action === 'spectate') return <></>
  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        <Card className={styles.inputCard}>
          <CardContent className={styles.inputCardContent}>
            <Typography className={styles.text}>Username</Typography>
            <TextField
              className={styles.usernameField}
              value={username}
              InputProps={{
                className: styles.textFieldFont,
              }}
              onChange={(event) => {
                setUsername(event.target.value)
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
              <Avatar className={styles.profileAvatar}>{username}</Avatar>
            </CardContent>
            <CardActions className={styles.profileCardActions}>
              <Button
                className={styles.confirmButton}
                onClick={joinRoom}
                variant="contained"
              >
                Confirm
              </Button>
            </CardActions>
          </Card>
          <div className={styles.playerCount}>
            <Typography className={styles.playerCountText}>players</Typography>
            <Typography className={styles.playerCountText}>
              waiting...
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
