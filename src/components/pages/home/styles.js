const { makeStyles } = require('@material-ui/core')

export const useIndexStyles = makeStyles((theme) => ({
  page: {
    margin: '13vh 0 0 0',
    [theme.breakpoints.down('sm')]: {
      margin: '7vh 3vh 0 3vh',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '10vh 3vh 0 3vh',
    },
  },
  gameTitle: {
    fontSize: '3.5rem',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Architects Daughter',
    marginBottom: '15vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
    },
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButton: {
    width: '100%',
    height: '20%',
    fontSize: '2.5rem',
    border: '3px solid',
    backgroundColor: 'white',
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      border: '3px solid black',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.6rem',
    },
  },
  spectateButton: {
    width: '47.5%',
    height: '15%',
    fontSize: '2.5rem',
    marginTop: '6vh',
    border: '3px solid',
    backgroundColor: 'white',
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      border: '3px solid black',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.6rem',
    },
  },
  hostButton: {
    width: '47.5%',
    height: '15%',
    fontSize: '2.5rem',
    marginTop: '6vh',
    marginLeft: '3vw',
    border: '3px solid',
    backgroundColor: 'white',
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      border: '3px solid black',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.6rem',
    },
  },
}))

export const useRoomCodeInputStyles = makeStyles((theme) => ({
  page: {
    margin: '10vh 5vw 0 5vw',
  },
  actionText: {
    fontFamily: 'Architects Daughter',
    fontSize: '3.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.9rem',
    },
  },
  roomCodeInput: {
    margin: '10vh 0 20vh 0',
    width: '60%',
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      margin: '10vh 0 15vh 0',
    },
  },
  buttons: {
    marginLeft: '60%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginLeft: '50%',
    },
  },
  button: {
    fontSize: '1.5rem',
    fontFamily: 'Architects Daughter',
    width: '15vw',
    marginLeft: '13%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: '2px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      border: '2px solid ' + theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      fontSize: '1rem',
      margin: '20% 0 0% 0%',
    },
  },
  textFieldFont: {
    fontSize: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
}))

export const useProfileStyles = makeStyles((theme) => ({
  page: {
    margin: '2vh 0 2vh 0',
    [theme.breakpoints.down('md')]: {
      margin: '1vh 1vw 1vh 1vw',
    },
  },
  cards: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  inputCard: {
    border: '1px solid black',
    width: '60%',
    [theme.breakpoints.down('md')]: {
      marginBottom: '4%',
      width: '100%',
    },
  },
  inputCardContent: {
    margin: '-2% 0 0 3%',
  },
  text: {
    textShadow: '1px 1px #00000020',
    fontSize: '4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  usernameField: {
    width: '80%',
    margin: '0% 0 7% 0',
    [theme.breakpoints.down('sm')]: {
      margin: '0% 0 3% 0',
    },
  },
  rightSide: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '5%',
      width: '30%',
      height: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '3% 0 0 0',
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '5% 0 0 0',
      display: 'flex',
      width: '100%',
      height: '36vh',
    },
  },
  profileCard: {
    border: '1px solid black',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  textContainer: {
    margin: '-2% 0 -10% 3%',
    [theme.breakpoints.down('sm')]: {
      margin: '-2% 0 -15% 3%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '-2% 0 -15% 3%',
    },
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  profileAvatar: {
    border: '1px solid black',
    width: '120px',
    height: '120px',
    [theme.breakpoints.down('sm')]: {
      width: '90px',
      height: '90px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '70px',
      height: '70px',
    },
  },
  profileCardActions: {
    justifyContent: 'center',
  },
  confirmButton: {
    fontFamily: 'Architects Daughter',
    fontSize: '1.2rem',
    width: '65%',
    margin: '10% 0 10% 0',
    border: '2px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      border: '2px solid ' + theme.palette.primary.main,
    },
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      margin: '-5% 0 -1% 0',
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '-7% 0 5% 0',
      fontSize: '0.75rem',
    },
  },
  playerCount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20% 0 0 0',
    [theme.breakpoints.down('sm')]: {
      margin: '35% 0 0 5vw',
    },
  },
  playerCountText: {
    fontFamily: 'Architects Daughter',
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  textFieldFont: {
    fontSize: '2.25rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
  playerCountAvatar: {
    backgroundColor: theme.palette.primary.main,
    width: '80px',
    height: '80px',
    fontSize: '3rem',
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      width: '60px',
      height: '60px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
      width: '40px',
      height: '40px',
    },
  },
}))
