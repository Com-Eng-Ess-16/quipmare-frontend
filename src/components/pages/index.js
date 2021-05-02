import { UserContext } from 'context/context'
import React, { useContext } from 'react'
import Home from './home'
import WaitingRoom from './waitingRoom'
import GameRoom from './gameRoom/index'
import { makeStyles } from '@material-ui/core'
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
  const styles = useStyles()
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
