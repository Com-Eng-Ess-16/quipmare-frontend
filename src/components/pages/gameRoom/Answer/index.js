import { useState } from 'react'
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import Countdown from 'components/common/Countdown'
import { getColor } from 'utils/colorUtil'
const useStyles = makeStyles((theme) => ({
  question: {
    marginTop: '20px',
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontSize: '4rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '15vh',
      fontSize: '2.5rem',
    },
  },
  answer: {
    width: '100%',
    minHeight: '30vh',
    display: 'flex',
    marginTop: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  textFieldFont: {
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
  },
  button: {
    [theme.breakpoints.up('md')]: {
      width: '20%',
      marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
      height: '50px',
    },
  },
  background: {
    backgroundColor: (props) => props.color.light,
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: -1,
  },
  waiting: {
    flexGrow: 1,
    marginTop: '30vh',
    [theme.breakpoints.down('sm')]: {
      marginTop: '25vh',
    },
  },
}))
function Answer() {
  // const userContext = useContext(UserContext)
  // const [question, setQuestion] = useState(null)
  // useEffect(() => {
  //   async function getData() {
  //     const res = await getQuestion(userContext.gameData.currentQuestionID)
  //     setQuestion(res.question)
  //   }
  //   getData()
  // }, [userContext.gameData.currentQuestionID])

  // TODO get value
  const question = 'When will I get 5 stars character?'
  const [answer, setAnswer] = useState('')
  const isWaiting = false

  const styles = useStyles({ color: getColor('0') })
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  if (isWaiting) {
    return (
      <Box display="flex" flexDirection="column" height="100%">
        <div className={styles.background} />
        <div className={styles.waiting}>
          <Typography
            variant="h5"
            color="primary"
            style={{ textAlign: 'center' }}
          >
            Your answer has been submitted!
          </Typography>
        </div>
        <Countdown text="Waiting for other players..." />
      </Box>
    )
  }
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <div className={styles.background} />
      <Box flexGrow={1}>
        <Typography className={styles.question}>{question}</Typography>
        <div className={styles.answer}>
          <TextField
            className={styles.textField}
            style={{
              minWidth: '80%',
              fontSize: '2rem',
              backgroundColor: 'white',
            }}
            InputProps={{
              className: styles.textFieldFont,
            }}
            inputProps={{
              style: { height: isSm ? '10vh' : '30vh' },
            }}
            multiline
            placeholder="TYPE HERE"
            variant="outlined"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value)
            }}
          />
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            onClick={() => {
              // postAnswer(userContext.roomCode, userContext.userID)
            }}
          >
            <CheckIcon fontSize="large" />
          </Button>
        </div>
      </Box>
      <Countdown />
    </Box>
  )
}
export default Answer
