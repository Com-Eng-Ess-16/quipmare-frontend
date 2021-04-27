import { useContext } from 'react'
import { PlayerContext, UserContext } from 'context/context'
import { getStartGame } from 'utils/apiService'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Avatar,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const { Typography, Button } = require('@material-ui/core')

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '2vh 0 2vh 0',
  },
  table: {
    overflowY: 'auto',
    border: '1px solid black',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 0 0',
    },
  },
  body: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginTop: '8vh',
    },
  },
  leftSide: {
    width: '45%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tableContainer: {
    maxHeight: '53vh',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '35.5vh',
      marginTop: '7%',
    },
  },
  tableRow: {
    display: 'flex',
    height: '10vh',
    border: '0.5px solid white',
    [theme.breakpoints.down('sm')]: {
      height: '8.2vh',
    },
  },
  tableHeadRow: {
    display: 'flex',
    height: '13vh',
    [theme.breakpoints.down('sm')]: {
      height: '10vh',
    },
  },
  avatarCell: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
  headAvatarCell: {
    width: '16%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
  },
  usernameCell: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: '1.5rem',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
  headUsernameCell: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: '2.25rem',
    backgroundColor: theme.palette.primary.light,
  },
  avatar: {
    width: '6.5vh',
    height: '6.5vh',
    border: '1px solid black',
    color: 'white',
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '4vh',
      height: '4vh',
    },
  },
  headAvatar: {
    width: '8vh',
    height: '8vh',
    border: '1px solid black',
    color: 'white',
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '5vh',
      height: '5vh',
    },
  },
  kickButton: {
    borderBottom: '1px solid white',
    borderRadius: '0',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,
    },
  },
  createRoomText: {
    fontFamily: 'Architects Daughter',
    fontSize: '3rem',
    textShadow: '2px 2px #00000020',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    },
  },
  hostText: {
    fontFamily: 'Architects Daughter',
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
  playerText: {
    fontFamily: 'Architects Daughter',
    fontSize: '2rem',
    marginBottom: '3%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  rightSide: {
    marginLeft: '10%',
    width: '45%',
    [theme.breakpoints.down('sm')]: {
      border: '1px solid black',
      margin: '5% 0 0 0',
      width: '100%',
    },
  },
  room: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  roomCodeText: {
    fontFamily: 'Architects Daughter',
    fontSize: '2rem',
    marginBottom: '6%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
      marginBottom: '0',
      display: 'flex',
      alignItems: 'center',
    },
  },
  roomCode: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Architects Daughter',
    fontSize: '4rem',
    width: '100%',
    height: '25%',
    textShadow: '3px 3px #00000020',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down('sm')]: {
      width: '68%',
      height: '100%',
      fontSize: '3rem',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '7%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3%',
    },
  },
  startButton: {
    fontFamily: 'Architects Daughter',
    fontSize: '2rem',
    width: '45%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    border: '2px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      border: '2px solid ' + theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
  leaveButton: {
    fontFamily: 'Architects Daughter',
    fontSize: '2rem',
    width: '45%',
    marginLeft: '10%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    border: '2px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      border: '2px solid ' + theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
  count: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  waitText: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '7%',
    fontFamily: 'Architects Daughter',
    fontSize: '1.25rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2%',
      fontSize: '0.75rem',
    },
  },
  playerCountText: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2%',
    fontFamily: 'Architects Daughter',
    fontSize: '1.75rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}))

function WaitingRoom() {
  const styles = useStyles()
  const userContext = useContext(UserContext)
  const playerContext = useContext(PlayerContext)
  if (playerContext.player === null) return <></>
  return (
    <div className={styles.page}>
      <Typography>{userContext.roomCode}</Typography>
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
                    <Avatar className={styles.headAvatar}></Avatar>
                  </TableCell>
                  <TableCell className={styles.headUsernameCell}>
                    Host
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Object.keys(playerContext.player).map((key) => {
                  return (
                    <TableRow className={styles.tableRow}>
                      <TableCell className={styles.avatarCell}>
                        <Avatar className={styles.avatar}></Avatar>
                      </TableCell>
                      <TableCell className={styles.usernameCell}>
                        {playerContext.player[key]}
                      </TableCell>
                      <IconButton className={styles.kickButton}>
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
            <Typography className={styles.roomCode}>XXXXXX</Typography>
          </div>
          <div className={styles.buttons}>
            <Button className={styles.startButton} variant="contained">
              START
            </Button>
            <Button className={styles.leaveButton} variant="contained">
              LEAVE
            </Button>
          </div>
          <div className={styles.count}>
            <Typography className={styles.waitText}>
              Waiting for players...
            </Typography>
            <Typography className={styles.playerCountText}>
              _ players joined
            </Typography>
          </div>
        </div>
      </div>
      {userContext.userID === 0 && (
        <Button variant="contained" color="primary" onClick={getStartGame}>
          start
        </Button>
      )}
    </div>
  )
}
export default WaitingRoom
