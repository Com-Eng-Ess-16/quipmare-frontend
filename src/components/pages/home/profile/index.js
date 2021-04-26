import { Button, TextField, Card, CardContent, Typography, Avatar, CardActions } from '@material-ui/core'
import { useContext, useState } from 'react'
import { postJoinRoom } from 'utils/apiService'
import { addListener } from 'utils/firebaseUtil'
import ColorInput from './ColorInput'
import { UserContext } from 'context/context'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '10vh -5vw 0 -5vw'
  },
  cards: {
    display: 'flex',
    border: '1px solid black'
  },
  inputCard: {
    border: '1px solid black',
    width: '60%'
  },
  inputCardContent: {
    margin: '0 5% 0 5%'
  },
  text: {
    textShadow: '1px 1px #00000020',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem'
    }
  },
  usernameField: {
    width: '80%',
    margin: '5% 0 5% 0',
    [theme.breakpoints.down('md')]: {
      margin: '7% 0 5% 0',
      fontSize: '1.5rem'
    }
  },
  profileCard: {
    border: '1px solid black',
    marginLeft: '5%',
    width: '35%',
    height: '60%'
  },
  textContainer: {
    marginLeft: '5%'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  profileAvatar: {
    border: '1px solid black',
    width: '25vh',
    height: '25vh'
  },
  profileCardActions: {
    justifyContent: 'center'
  },
  confirmButton: {
    fontFamily: 'Architects Daughter',
    fontSize: '1.5rem',
    width: '65%',
    margin: '5% 0 10% 0',
    border: '1px solid black',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  playerCount: {
    
  },
  playerCountText: {
    fontFamily: 'Architects Daughter',
    fontSize: '2rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
    }
  }
}))

function Profile(action) {
  const styles = useStyles()
  const [username, setUsername] = useState('')
  const [color, setColor] = useState('0')
  const userContext = useContext(UserContext)
  const joinRoom = async () => {
    const res = await postJoinRoom(
      userContext.roomCode,
      username,
      color,
      action
    )
    userContext.setUserID(res.userID)
    addListener(res.userID, userContext.roomCode, userContext)
  }
  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        <Card className={styles.inputCard}>
          <CardContent className={styles.inputCardContent}>
            <Typography className={styles.text} variant='h5'>
              Username
            </Typography>
            <TextField className={styles.usernameField}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
            <ColorInput color={color} setColor={setColor} />
          </CardContent>
        </Card>
        <Card className={styles.profileCard}>
            <CardContent className={styles.textContainer}>
              <Typography className={styles.text} variant='h5'>
                Profile
              </Typography>
            </CardContent>
            <CardContent className={styles.avatarContainer}>
                <Avatar className={styles.profileAvatar}>
                  {username}
                </Avatar>
            </CardContent>
            <CardActions className={styles.profileCardActions}>
              <Button className={styles.confirmButton} onClick={joinRoom} variant='contained'>Confirm</Button>
            </CardActions>
        </Card>
        <div className={styles.playerCount}>
          <Typography className={styles.playerCountText}>players</Typography>
          <Typography className={styles.playerCountText}>waiting</Typography>
      </div>
      </div>
      
    </div>
  )
}
export default Profile
