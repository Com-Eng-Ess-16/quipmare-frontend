import { Box, makeStyles, Typography } from '@material-ui/core'
import Countdown from 'components/common/Countdown'
import { useEffect, useState } from 'react'
import { getVoteQuestion } from 'utils/apiService'
import AnswerResult from './AnswerResult'
import firebase from 'firebase'
import { useAppController } from 'utils/appController'
import { useError } from 'components/common/Error'
import Loading from 'components/common/Loading'

const useStyles = makeStyles((theme) => ({
  question: {
    marginTop: '20px',
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontSize: '3.5rem',
    fontFamily: 'Prompt',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '5px',
    },
  },
  button: {
    width: '100%',
    minHeight: '100px',
    display: 'flex',
    marginTop: '20px',
    border: '1px solid black',
    fontSize: '2.5rem',
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
    height: '100%',
    width: '100vw',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: -1,
  },
}))

function VoteResult() {
  const [data, setData] = useState(null)
  const appController = useAppController()
  const styles = useStyles({ color: appController.getColor() })
  const setError = useError()

  useEffect(() => {
    async function getData() {
      try {
        const dbRef = firebase
          .database()
          .ref('game/' + appController.gameID + '/questionState')
        const questionState = (await dbRef.get()).val()
        const res = await getVoteQuestion(appController.gameID, questionState)
        setData(res.question)
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
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flexGrow={1}>
        <div className={styles.background} />
        <Typography className={styles.question}>
          {data.questionPrompt}
        </Typography>
        <AnswerResult win={data.a.point > data.b.point} data={data.a} />
        <AnswerResult win={data.b.point > data.a.point} data={data.b} />
      </Box>
      <Countdown />
    </Box>
  )
}
export default VoteResult
