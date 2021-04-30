import { useEffect, useState } from 'react'
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
import { useAppController } from 'utils/appController'
import { getPlayerQuestion, postAnswer } from 'utils/apiService'
import { useError } from 'components/common/Error'
import Loading from 'components/common/Loading'
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
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
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
  const [question, setQuestion] = useState(null)
  const appController = useAppController()
  const setError = useError()
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  useEffect(() => {
    async function getData() {
      try {
        const res = await getPlayerQuestion(
          appController.gameID,
          appController.userID
        )
        setQuestion(res.playerQuestion)
      } catch (err) {
        setError(err)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appController.gameID, appController.userID])

  const sendAnswer = async () => {
    try {
      await postAnswer(
        appController.gameID,
        appController.userID,
        answer,
        index
      )
      setIndex(index + 1)
      setAnswer('')
    } catch (err) {
      setError(err)
    }
  }

  const styles = useStyles({ color: appController.getColor() })
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  if (index === 2) {
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
  if (question === null) return <Loading />
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <div className={styles.background} />
      <Box flexGrow={1}>
        <Typography className={styles.question}>
          {question[index].question}
        </Typography>
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
            onClick={sendAnswer}
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
