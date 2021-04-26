import { Button, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { addPlayerListener } from 'utils/firebaseUtil'
import { getCreateRoom } from 'utils/apiService'
import Profile from './profile'
import RoomCodeInput from './roomCodeInput'
import { PlayerContext, UserContext } from 'context/context'
import { makeStyles } from '@material-ui/core'
//import zIndex from '@material-ui/core/styles/zIndex'

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '13vh 0 0 0',
    [theme.breakpoints.down('sm')]: {
      margin: '7vh 3vh 0 3vh'
    },
    [theme.breakpoints.down('xs')]: {
      margin: '10vh 3vh 0 3vh'
    }
  },
  gameTitle: {
    fontSize: '3.5rem',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Architects Daughter',
    marginBottom: '15vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    }
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  joinButton: {
    width: '100%',
    height: '20%',
    fontSize: '2.5rem',
    border: '3px solid',
    backgroundColor: 'white',
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      border: '3px solid black'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.6rem'
    }
  },
  spectateButton: {
    width: '47.5%',
    height: '15%',
    fontSize: '2.5rem',
    marginTop: '6vh',
    border: '3px solid',
    backgroundColor: 'white',
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      border: '3px solid black'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.6rem'
    }
  },
  hostButton: {
    width: '47.5%',
    height: '15%',
    fontSize: '2.5rem',
    marginTop: '6vh',
    marginLeft: '3vw',
    border: '3px solid',
    backgroundColor: 'white',
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      border: '3px solid black'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.6rem'
    }
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
      <div className={styles.page}>
        <div>
          <Typography className={styles.gameTitle}>The Greatest Jester</Typography>
        </div>
        <div className={styles.buttons}>
          <Button className={styles.joinButton} color="primary" variant="outlined" onClick={() => setAction('join')}>join</Button>
        </div>
        <div className={styles.buttons}>
          <Button className={styles.spectateButton} color="primary" variant="outlined" onClick={() => setAction('spectate')}>spectate</Button>
          <Button className={styles.hostButton} color="primary" variant="outlined" onClick={createRoom}>host</Button>
        </div>
      </div>
    )
  if (userContext.roomCode !== null) return <Profile action={action} />
  if (action === 'join' || action === 'spectate')
    return <RoomCodeInput action={action} />
  return <></>
}
export default Home
