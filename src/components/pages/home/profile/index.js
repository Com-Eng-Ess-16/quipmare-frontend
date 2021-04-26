import { Button, TextField, Card, CardContent, Typography, Avatar } from '@material-ui/core'
import { useContext, useState } from 'react'
import { postJoinRoom } from 'utils/apiService'
import { addListener } from 'utils/firebaseUtil'
import ColorInput from './ColorInput'
import { UserContext } from 'context/context'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cards: {
    display: 'flex'
  },
  inputCard: {
    marginTop: '5vh',
    marginLeft: '-13vw',
    width: '750px'
  },
  inputCardContent: {
    marginLeft: '2vw'
  },
  usernameField: {
    width: '300px',
    marginTop: '20px'
  },
  selectText: {
    fontFamily: 'Architects Daughter',
    fontSize: '2.25rem',
    marginTop: '3vh'
  },
  profileCard: {
    marginTop: '5vh',
    marginLeft: '3vw',
    width: '400px'
  },
  profileCardContext: {
    marginLeft: '2vw',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileAvatar: {
    color: 'white',
    backgroundColor: 'white',
    border: '1px solid black',
    width: '250px',
    height: '250px'
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
    <>
      <div className={styles.cards}>
        <Card className={styles.inputCard}>
          <CardContent className={styles.inputCardContent}>
            <Typography variant='h6'>
              Username
            </Typography>
            <TextField className={styles.usernameField}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
            <Typography className={styles.selectText}>
              Select your color
            </Typography>
            <ColorInput color={color} setColor={setColor} />
          </CardContent>
        </Card>
        <Card className={styles.profileCard}>
          <CardContent className={styles.profileCardContext}>
              <Typography variant='h6'>
                Profile
              </Typography>
              <Avatar className={styles.profileAvatar}>

              </Avatar>
          </CardContent>
        </Card>
        <Button onClick={joinRoom}>Confirm</Button>
      </div>
    </>
  )
}
export default Profile
