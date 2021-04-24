import { makeStyles, Typography } from '@material-ui/core'
import { getColor } from './../../utils/colorUtil'
import { useContext } from 'react'
import { UserContext } from 'context/context'
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
  const username = 'PKHING'
  const score = '1234'
  const color = '0'

  const styles = useStyles(getColor(color))
  const userContext = useContext(UserContext)
  console.log(userContext.gameData.gameState)

  // Home page, Waiting room, Podium page
  if (
    userContext.gameData.appState !== 2 ||
    userContext.gameData.gameState === 3
  )
    return <></>

  // Standing page
  if (userContext.gameData.gameState === 2) {
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
  return (
    <header className={styles.container}>
      <Typography className={styles.text}>{username}</Typography>
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
