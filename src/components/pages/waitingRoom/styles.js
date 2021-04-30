const { makeStyles } = require('@material-ui/core')

export const useStyles = makeStyles((theme) => ({
  page: {
    margin: '2vh 0 2vh 0',
    /* HOST VIEW */
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
  /* NON HOST VIEW */
  firstSection: {
    display: 'flex',
    margin: '8vh 0 0 5%',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: '6vh 0 0 0',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '10vh',
    },
  },
  joinText: {
    fontFamily: 'Architects Daughter',
    fontSize: '2.1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1rem',
    },
  },
  roomText: {
    fontFamily: 'Architects Daughter',
    fontSize: '2.6rem',
    marginTop: '-1.5vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.9rem',
      margin: '0 0 0 45%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.6rem',
    },
  },
  secondSection: {
    margin: '5vh 0 0 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Architects Daughter',
    fontSize: '5rem',
    width: '100%',
    height: '25vh',
    textShadow: '3px 3px #00000020',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
      height: '12.5vh',
      marginTop: '3vh',
    },
  },
  thirdSection: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5vh 5% 0 5%',
  },
  countNonHost: {
    width: '100%',
  },
  waitTextNonHost: {
    fontFamily: 'Architects Daughter',
    fontSize: '1.6rem',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  playerCountTextNonHost: {
    fontFamily: 'Architects Daughter',
    fontSize: '2.1rem',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3rem',
    },
  },
  avatarList: {
    margin: '4vh 5% 0 5%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {},
  },
  avatarNonHost: {
    width: '6vw',
    height: '6vw',
    margin: '0 2% 0 0',
    border: '1px solid black',
    color: 'black',
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '25px',
      height: '25px',
    },
  },
  leaveButtonUpMd: {
    fontFamily: 'Architects Daughter',
    fontSize: '2.1rem',
    width: '30%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    border: '3px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      border: '3px solid ' + theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  smBottomSection: {
    marginTop: '5vh',
    display: 'flex',
    justifyContent: 'center',
  },
  leaveButtonDownSm: {
    fontFamily: 'Architects Daughter',
    fontSize: '1.6rem',
    width: '50%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    border: '2px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      border: '2px solid ' + theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))
