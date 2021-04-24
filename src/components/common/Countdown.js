import { makeStyles, Typography } from '@material-ui/core'
import { useContext } from 'react'
import { default as ReactCountdown } from 'react-countdown'
import { postCountdownEnd } from 'utils/apiService'
import { UserContext } from 'context/context'
import { getColor } from 'utils/colorUtil'
const useStyles = makeStyles((theme) => ({
  container: {
    right: '20px',
    bottom: '20px',
    position: 'absolute',
  },
  text: {
    fontSize: '3rem',
    fontFamily: 'Architects Daughter',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  time: {
    fontSize: '3rem',
    background: (props) => props.dark,
    fontFamily: 'Architects Daughter',
    display: 'inline-block',
    minWidth: '70px',
    textAlign: 'center',
    borderRadius: '100px',
    marginLeft: '30px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '20px',
      fontSize: '2rem',
      minWidth: '45px',
    },
  },
}))
export default function Countdown(props) {
  const userContext = useContext(UserContext)
  const color = '0'
  const styles = useStyles(getColor(color))
  return (
    <ReactCountdown
      date={userContext.gameData.countdownEnd}
      onComplete={() => {
        if (useContext.userID === 0) {
          postCountdownEnd(useContext.roomCode)
        }
      }}
      renderer={(prop) => (
        <div className={styles.container}>
          <Typography className={styles.text}>Ending in...</Typography>
          <div className={styles.time}>{prop.seconds + prop.minutes * 60}</div>
        </div>
      )}
    />
  )
}
