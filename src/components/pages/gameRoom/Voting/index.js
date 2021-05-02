import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import Countdown from 'components/common/Countdown'
import { useEffect, useState } from 'react'
import { getVoteQuestion, postVote } from 'utils/apiService'
import { useAppController } from 'utils/appController'
import firebase from 'firebase'
import { useError } from 'components/common/Error'
import Loading from 'components/common/Loading'

const useStyles = makeStyles((theme) => ({
  question: {
    marginTop: '20px',
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontSize: '4rem',
    fontFamily: 'Prompt',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  button: {
    width: '100%',
    minHeight: '100px',
    display: 'flex',
    marginTop: '20px',
    border: '1px solid black',
    fontSize: '2.5rem',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
    fontFamily: 'Prompt',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '70px',
      fontSize: '1.5rem',
    },
  },
  waiting: {
    marginTop: '30vh',
    [theme.breakpoints.down('sm')]: {
      marginTop: '25vh',
    },
  },
  background: {
    backgroundColor: (props) => props.color.light,
    height: '100%',
    width: '100vw',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: -1,
  },
  waitingText: {
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
  },
  votedAnswer: {
    fontFamily: 'Prompt',
  },
}))

function Voting() {
  const appController = useAppController()
  const [data, setData] = useState(null)
  const styles = useStyles({ color: appController.getColor() })
  const [isWaiting, setWaiting] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [votedAnswer, setVotedAnswer] = useState('Never')
  const setError = useError()

  const sendVote = async (choice) => {
    try {
      await postVote(
        appController.gameID,
        appController.userID,
        questionIndex,
        choice
      )
      setVotedAnswer(data[choice].answer)
      localStorage.setItem('vote', data[choice].answer)
      setWaiting(true)
    } catch (err) {
      setError(err)
      if (err.response.data === 'Already Vote') {
        setVotedAnswer(localStorage.getItem('vote'))
        setWaiting(true)
      }
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const dbRef = firebase
          .database()
          .ref('game/' + appController.gameID + '/questionState')
        const questionState = (await dbRef.get()).val()
        setQuestionIndex(questionState)
        const res = await getVoteQuestion(appController.gameID, questionState)
        setData(res.question)
        if (
          localStorage.getItem('questionIndex') === String(questionState) &&
          localStorage.getItem('vote') !== null
        ) {
          setVotedAnswer(localStorage.getItem('vote'))
          setWaiting(true)
        } else {
          await appController.clearGameData()
          localStorage.setItem('questionIndex', questionState)
        }
      } catch (err) {
        setError(err)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appController.gameID])

  if (data === null || data === undefined)
    return (
      <>
        <div className={styles.background} />
        <Loading />
      </>
    )
  if (
    String(data.a.owner) === String(appController.userID) ||
    String(data.b.owner) === String(appController.userID)
  ) {
    return (
      <Box display="flex" flexDirection="column" height="100%">
        <div className={styles.background} />
        <Box flexGrow={1} className={styles.waitingText}>
          <Typography
            variant="h5"
            color="primary"
            style={{ marginTop: '30px' }}
          >
            Wait for other players to vote!
          </Typography>
        </Box>
        <Countdown text="Waiting for other players..." />
      </Box>
    )
  }
  if (isWaiting) {
    return (
      <Box display="flex" flexDirection="column" height="100%">
        <div className={styles.background} />
        <Box flexGrow={1} className={styles.waitingText}>
          <Typography
            variant="h5"
            color="primary"
            style={{ marginTop: '30px' }}
          >
            Your vote has been submitted!
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            className={styles.votedAnswer}
          >
            {'You vote "' + votedAnswer + '"'}
          </Typography>
        </Box>
        <Countdown text="Waiting for other players..." />
      </Box>
    )
  }
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <div className={styles.background} />
      <Box flexGrow={1}>
        <Typography className={styles.question}>
          {data.questionPrompt}
        </Typography>

        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          onClick={() => {
            sendVote('a')
          }}
        >
          {data['a'].answer}
        </Button>
        <Button
          className={styles.button}
          style={{ backgroundColor: 'white' }}
          onClick={() => {
            sendVote('b')
          }}
        >
          {data['b'].answer}
        </Button>
      </Box>
      <Countdown />
    </Box>
  )
}
export default Voting
