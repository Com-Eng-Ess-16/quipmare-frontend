import { makeStyles, Typography } from '@material-ui/core'
import { default as ReactCountdown } from 'react-countdown'
import { postCountdownEnd } from 'utils/apiService'
import { useAppController } from 'utils/appController'
import { useError } from './Error'
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '15px',
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'flex-end',
  },
  text: {
    marginLeft: '10px',
    textAlign: 'right',
    fontSize: '3rem',
    fontFamily: 'Architects Daughter',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
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
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export default function Countdown(props) {
  const appController = useAppController()
  const styles = useStyles(appController.getColor())
  const setError = useError()
  if (!appController.countdownEnd) return <></>
  return (
    <ReactCountdown
      date={appController.countdownEnd}
      onComplete={async () => {
        if (String(appController.userID) === String(0)) {
          try {
            await sleep(500)
            await postCountdownEnd(appController.gameID)
          } catch (err) {
            setError(err)
          }
        }
        appController.clearGameData()
      }}
      renderer={(prop) => (
        <div className={styles.container}>
          <Typography className={styles.text}>
            {props.text ? props.text : 'Ending in...'}
          </Typography>
          <div className={styles.time}>{prop.seconds + prop.minutes * 60}</div>
        </div>
      )}
    />
  )
}
