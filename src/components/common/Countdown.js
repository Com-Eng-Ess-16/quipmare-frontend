import { Typography } from '@material-ui/core'
import { useContext } from 'react'
import { default as ReactCountdown } from 'react-countdown'
import { postCountdownEnd } from 'utils/apiService'
import { UserContext } from 'context/context'
export default function Countdown(props) {
  const userContext = useContext(UserContext)
  return (
    <ReactCountdown
      date={userContext.gameData.countdownEnd}
      onComplete={() => {
        if (useContext.userID === 0) {
          postCountdownEnd(useContext.roomCode)
        }
      }}
      renderer={(prop) => (
        <Typography>
          {`timeLeft : ${prop.seconds + prop.minutes * 60} seconds`}
        </Typography>
      )}
    />
  )
}
