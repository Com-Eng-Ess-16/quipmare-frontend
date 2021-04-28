import { Hidden, makeStyles, Typography } from '@material-ui/core'
import { useContext } from 'react'
import { UserContext } from 'context/context'
import { useColor } from 'utils/colorUtil'
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    paddingLeft: '40px',
    paddingRight: '40px',
    backgroundColor: (props) => props.dark,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  text: {
    fontSize: '3.5rem',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
}))
function Header() {
  // TODO get value
  const getColor = useColor()
  const username = 'PKHING'
  const score = '1234'
  const roomCode = 'ASFDLD'

  const styles = useStyles(getColor())
  const userContext = useContext(UserContext)

  // Home page, Waiting room, Podium page
  if (
    userContext.gameData.appState !== 2 ||
    userContext.gameData.gameState === 4
  )
    return <></>

  // Standing page
  if (userContext.gameData.gameState === 3) {
    return (
      <header className={styles.container}>
        <Typography
          className={styles.text}
          style={{ flexGrow: 1, textAlign: 'center' }}
        >
          CURRENT STANDINGS
        </Typography>
      </header>
    )
  }

  // TODO check if this player is spectator
  if (userContext.userType === 'spectate') {
    return (
      <header className={styles.container}>
        <Typography className={styles.text}>{'<' + roomCode + '>'}</Typography>
      </header>
    )
  }

  return (
    <header className={styles.container}>
      <Typography className={styles.text}>{username}</Typography>
      <Hidden smDown>
        <Typography className={styles.text}>{'<' + roomCode + '>'}</Typography>
      </Hidden>
      <Typography
        className={styles.text}
        style={{ fontFamily: 'Architects Daughter' }}
      >
        {score + ' points'}
      </Typography>
    </header>
  )
}
export default Header
