import { UserContext } from 'context/context'
import React, { useContext } from 'react'
import Home from './home'
import WaitingRoom from './waitingRoom'
import GameRoom from './gameRoom/index'
import { Box, Button, makeStyles } from '@material-ui/core'
import { useError } from 'components/common/Error'
import { Link } from 'react-router-dom'
import Header from 'components/shell/Header'

const useStyles = makeStyles((theme) => ({
  body: {
    height: '100%',
    maxWidth: '1000px',
    width: '90%',
    margin: 'auto',
    display: 'block',
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
}))

function Pages() {
  const userContext = useContext(UserContext)
  const setError = useError()
  const styles = useStyles()
  if (userContext.roomState === -1)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="auto"
      >
        <p>!! for dev only !!</p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setRoomState(null)
          }}
        >
          Home page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setRoomState('waiting')
          }}
        >
          Waiting Room
        </Button>
        <p>GameRoom</p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setRoomState('playing')
            userContext.setGameState(0)
          }}
        >
          Answer Page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setRoomState('playing')
            userContext.setGameState(1)
          }}
        >
          Voting Page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setRoomState('playing')
            userContext.setGameState(2)
          }}
        >
          Vote Result Page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setRoomState('playing')
            userContext.setGameState(3)
          }}
        >
          Standing Page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            userContext.setRoomState('playing')
            userContext.setGameState(4)
          }}
        >
          Podium Page
        </Button>
        <Link to="/gallery/gameID" style={{ textDecoration: 'none' }}>
          <Button color="primary" variant="contained">
            Gallery
          </Button>
        </Link>
        <Button
          onClick={() => {
            setError('test')
          }}
        >
          test Error
        </Button>
      </Box>
    )
  if (userContext.roomState === 'waiting')
    return (
      <>
        <Header />
        <div className={styles.body}>
          <WaitingRoom />
        </div>
      </>
    )
  if (userContext.roomState === 'playing')
    return (
      <>
        <Header />
        <div className={styles.body}>
          <GameRoom />
        </div>
      </>
    )
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Home />
      </div>
    </>
  )
}
export default Pages
