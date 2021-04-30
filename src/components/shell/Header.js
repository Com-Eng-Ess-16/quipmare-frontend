import { Hidden, makeStyles, Typography } from '@material-ui/core'
import { useAppController } from 'utils/appController'
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
  const appController = useAppController()
  const getColor = appController.getColor
  const username = appController.username
  const score = appController.score
  const roomCode = appController.roomCode

  const styles = useStyles(getColor())

  // Home page, Waiting room, Podium page
  if (appController.roomState !== 'playing' || appController.gameState === 4)
    return <></>

  // Standing page
  if (appController.gameState === 3) {
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
  if (appController.userType === 'spectate') {
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
