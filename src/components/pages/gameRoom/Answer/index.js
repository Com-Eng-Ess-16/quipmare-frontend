import { useState } from 'react'
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import Countdown from 'components/common/Countdown'
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

  const styles = useStyles()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Typography className={styles.question}>{question}</Typography>
      <div className={styles.answer}>
        <TextField
          className={styles.textField}
          style={{ minWidth: '80%', fontSize: '2rem' }}
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
      <Countdown />
    </>
  )
}
export default Answer
