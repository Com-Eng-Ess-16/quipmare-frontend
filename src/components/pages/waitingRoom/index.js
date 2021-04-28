import { useContext } from 'react'
import { PlayerContext, UserContext } from 'context/context'
//import { getStartGame } from 'utils/apiService'
import { Avatar } from '@material-ui/core'
import { useStyles } from './styles'
import HostView from './HostView'
import { useColor } from 'utils/colorUtil'
import Loading from 'components/common/Loading'

const { Typography, Button } = require('@material-ui/core')

function WaitingRoom() {
  const styles = useStyles()
  const userContext = useContext(UserContext)
  const playerContext = useContext(PlayerContext)
  const player = playerContext.player
  const getColor = useColor()
  if (playerContext.player === null || userContext.userID === null)
    return <Loading />
  return (
    <div className={styles.page}>
      {userContext.userID === 0 && <HostView />}
      {userContext.userID !== 0 && (
        <>
          <div className={styles.firstSection}>
            <Typography className={styles.joinText}>
              you have joined&nbsp;&nbsp;
            </Typography>
            <Typography className={styles.roomText}>room code</Typography>
          </div>
          <Typography className={styles.secondSection}>
            {userContext.roomCode}
          </Typography>

          <div className={styles.thirdSection}>
            <div className={styles.countNonHost}>
              <Typography className={styles.waitTextNonHost}>
                Waiting for players...
              </Typography>
              <Typography className={styles.playerCountTextNonHost}>
                {Object.keys(playerContext.player).length + ' players joined'}
              </Typography>
            </div>
            <Button className={styles.leaveButtonUpMd} variant="contained">
              LEAVE
            </Button>
          </div>
          <div className={styles.avatarList}>
            {Object.keys(player).map((id) => (
              <Avatar
                className={styles.avatarNonHost}
                style={{ backgroundColor: getColor(player[id].color).light }}
                key={id}
              >
                {' '}
              </Avatar>
            ))}
          </div>
          <div className={styles.smBottomSection}>
            <Button className={styles.leaveButtonDownSm} variant="contained">
              LEAVE
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
export default WaitingRoom
