import { Avatar, Button, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { addPlayerListener } from 'utils/firebaseUtil'
import { getCreateRoom } from 'utils/apiService'
import Profile from './profile'
import RoomCodeInput from './roomCodeInput'
import { PlayerContext, UserContext } from 'context/context'
import { makeStyles } from '@material-ui/core'
//import zIndex from '@material-ui/core/styles/zIndex'

const useStyles = makeStyles((theme) => ({
  gameTitle: {
    //fontSize: '3.5rem',
    marginTop: '100px',
    fontFamily: 'Architects Daughter'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px'
  },
  joinButton: {
    marginTop: '80px',
    width: '100%',
    height: '100px',
    fontSize: '2.5rem',
    border: '3px solid',
    backgroundColor: 'white'
  },
  spectateButton: {
    width: '47.5%',
    height: '100px',
    marginRight: '5%',
    fontSize: '2.5rem',
    border: '3px solid',
    backgroundColor: 'white'
  },
  hostButton: {
    width: '47.5%',
    height: '100px',
    fontSize: '2.5rem',
    border: '3px solid',
    backgroundColor: 'white'
  },
  colorAvatar1: {
    color: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    border: '1px solid black',
    width: '250px',
    height: '250px',
    marginTop: '-120px',
    marginBottom: '-150px',
    marginLeft: '-50px',
    zIndex: '-1'
  },
  colorAvatar2: {
    color: '#FFFFDC',
    backgroundColor: '#FFFFDC',
    border: '1px solid black',
    width: '300px',
    height: '300px',
    marginTop: '150px',
    marginBottom: '-430px',
    marginLeft: '-450px',
    zIndex: '-1'
  },
  colorAvatar3: {
    color: '#9BFFFF',
    backgroundColor: '#9BFFFF',
    border: '1px solid black',
    width: '300px',
    height: '300px',
    marginLeft: '250px',
    marginTop: '200px',
    marginBottom: '-500px',
    zIndex: '-1'
  },
  colorAvatar4: {
    color: 'yellow',
    backgroundColor: 'yellow',
    width: '300px',
    height: '300px',
    marginTop: '-150px',
    marginBottom: '-150px',
    zIndex: '-1'
  },
  colorAvatar5: {
    color: 'yellow',
    backgroundColor: 'yellow',
    width: '300px',
    height: '300px',
    marginTop: '-150px',
    marginBottom: '-150px',
    zIndex: '-1'
  }
}))

function Home() {
  const styles = useStyles()
  const userContext = useContext(UserContext)
  const [action, setAction] = useState('')
  const playerContext = useContext(PlayerContext)
  const createRoom = async () => {
    const res = await getCreateRoom()
    setAction('create')
    addPlayerListener(res.roomCode, playerContext)
    userContext.setRoomCode(res.roomCode)
  }

  if (action === '')
    return (
      <>
        <div>
          <Avatar className={styles.colorAvatar1} variant="circle"></Avatar>
        </div>
        <div>
          <Avatar className={styles.colorAvatar2} variant="circle"></Avatar>
        </div>
        <div>
          <Typography className={styles.gameTitle} variant='h4'>
            The Greatest Jester
          </Typography>
        </div>
        <div className={styles.buttons}>
          <Button className={styles.joinButton} color="primary" variant="outlined" onClick={() => setAction('join')}>join</Button>
        </div>
        <div className={styles.buttons}>
          <Button className={styles.spectateButton} color="primary" variant="outlined" onClick={() => setAction('spectate')}>spectate</Button>
          <Button className={styles.hostButton} color="primary" variant="outlined" onClick={createRoom}>host</Button>
        </div>
      </>
    )
  if (userContext.roomCode !== null) return <Profile action={action} />
  if (action === 'join' || action === 'spectate')
    return <RoomCodeInput action={action} />
  return <></>
}
export default Home
