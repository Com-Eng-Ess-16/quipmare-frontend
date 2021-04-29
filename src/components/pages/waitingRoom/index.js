import { Avatar } from '@material-ui/core'
import { useStyles } from './styles'
import HostView from './HostView'
import { useColor } from 'utils/colorUtil'
import Loading from 'components/common/Loading'
import { useAppController } from 'utils/appController'

const { Typography, Button } = require('@material-ui/core')

function WaitingRoom() {
  const styles = useStyles()
  const appController = useAppController()
  const player = appController.player
  const getColor = useColor()

  if (player === null || appController.userID === null || !player[0])
    return <Loading />
  return (
    <div className={styles.page}>
      {appController.userID === 0 && <HostView />}
      {appController.userID !== 0 && (
        <>
          <div className={styles.firstSection}>
            <Typography className={styles.joinText}>
              you have joined&nbsp;&nbsp;
            </Typography>
            <Typography className={styles.roomText}>room code</Typography>
          </div>
          <Typography className={styles.secondSection}>
            {appController.roomCode}
          </Typography>

          <div className={styles.thirdSection}>
            <div className={styles.countNonHost}>
              <Typography className={styles.waitTextNonHost}>
                Waiting for players...
              </Typography>
              <Typography className={styles.playerCountTextNonHost}>
                {Object.keys(appController.player).length + ' players joined'}
              </Typography>
            </div>
            <Button
              onClick={() => {
                appController.kickPlayer()
              }}
              className={styles.leaveButtonUpMd}
              variant="contained"
            >
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
            <Button
              className={styles.leaveButtonDownSm}
              onClick={() => appController.kickPlayer()}
              variant="contained"
            >
              LEAVE
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
export default WaitingRoom
