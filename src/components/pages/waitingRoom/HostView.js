import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Button,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { useStyles } from './styles'
import { useAppController } from 'utils/appController'
function HostView() {
  const appController = useAppController()
  const styles = useStyles()

  const player = appController.player

  return (
    <>
      <Typography className={styles.createRoomText}>CREATING A ROOM</Typography>
      <Typography className={styles.hostText}>you are the host :)</Typography>
      <div className={styles.body}>
        <div className={styles.leftSide}>
          <Typography className={styles.playerText}>players</Typography>
          <TableContainer className={styles.tableContainer}>
            <Table
              className={styles.table}
              stickyHeader
              aria-label="simple table"
            >
              <TableHead>
                <TableRow className={styles.tableHeadRow}>
                  <TableCell className={styles.headAvatarCell}>
                    <Avatar
                      className={styles.headAvatar}
                      style={{
                        backgroundColor: appController.getColor(player[0].color)
                          .light,
                      }}
                    >
                      {' '}
                    </Avatar>
                  </TableCell>
                  <TableCell className={styles.headUsernameCell}>
                    {player[0].username}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Object.keys(player).map((id) => {
                  if (id === '0' || id === 0) return <></>
                  return (
                    <TableRow key={id} className={styles.tableRow}>
                      <TableCell className={styles.avatarCell}>
                        <Avatar
                          className={styles.avatar}
                          style={{
                            backgroundColor: appController.getColor(
                              player[id].color
                            ).light,
                          }}
                        >
                          {' '}
                        </Avatar>
                      </TableCell>
                      <TableCell className={styles.usernameCell}>
                        {player[id].username}
                      </TableCell>
                      <IconButton
                        onClick={() => appController.kickPlayer(id)}
                        className={styles.kickButton}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.room}>
            <Typography className={styles.roomCodeText}>
              room code{'>'}
            </Typography>
            <Typography className={styles.roomCode}>
              {appController.roomCode}
            </Typography>
          </div>
          <div className={styles.buttons}>
            <Button
              onClick={() => appController.startGame()}
              className={styles.startButton}
              variant="contained"
            >
              START
            </Button>
            <Button
              className={styles.leaveButton}
              onClick={() => appController.kickPlayer()}
              variant="contained"
            >
              LEAVE
            </Button>
          </div>
          <div className={styles.count}>
            <Typography className={styles.waitText}>
              &nbsp;Waiting for players...&nbsp;
            </Typography>
            <Typography className={styles.playerCountText}>
              &nbsp;
              {Object.keys(appController.player).length + ' players joined'}
              &nbsp;
            </Typography>
          </div>
        </div>
      </div>
    </>
  )
}
export default HostView
