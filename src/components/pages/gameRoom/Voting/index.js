import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import Countdown from 'components/common/Countdown'
import { useEffect, useState } from 'react'
import { getVoteQuestion } from 'utils/apiService'
import { useAppController } from 'utils/appController'
import firebase from 'firebase'
import { useError } from 'components/common/Error'

const useStyles = makeStyles((theme) => ({
  question: {
    marginTop: '20px',
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontSize: '4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
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
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '70px',
      fontSize: '2rem',
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
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
  },
  waitingText: {
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
  },
}))

function Voting() {
  // TODO
  const appController = useAppController()
  const [data, setData] = useState(null)
  const styles = useStyles({ color: appController.getColor() })
  const [isWaiting, setWaiting] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [votedAnswer, SetVotedAnswer] = useState('Never')
  const setError = useError()
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
      } catch (err) {
        setError(err)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appController.gameID])

  if (data === null || data === undefined) return <></>
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
          <Typography variant="h5" color="primary">
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
          onClick={() => {}}
        >
          {data['a'].answer}
        </Button>
        <Button
          className={styles.button}
          style={{ backgroundColor: 'white' }}
          onClick={() => {}}
        >
          {data['b'].answer}
        </Button>
      </Box>
      <Countdown />
    </Box>
  )
}
export default Voting
