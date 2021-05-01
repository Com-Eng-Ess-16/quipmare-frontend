/* eslint-disable no-unused-vars */
import { Box, makeStyles, Typography } from '@material-ui/core'
import Countdown from 'components/common/Countdown'
import { UserContext } from 'context/context'
import { useContext, useEffect, useState } from 'react'
import { getAnswer } from 'utils/apiService'
import { useColor } from 'utils/colorUtil'
import AnswerResult from './AnswerResult'

const useStyles = makeStyles((theme) => ({
  question: {
    marginTop: '20px',
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontSize: '4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
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
  const userContext = useContext(UserContext)
  const getColor = useColor()
  const styles = useStyles({ color: getColor() })

  // useEffect(() => {
  //   async function getData() {
  //     const res = await getAnswer(
  //       userContext.gameData.currentQuestionID,
  //       userContext.roomCode
  //     )
  //     setData(res)
  //   }
  //   getData()
  // }, [userContext.gameData.currentQuestionID, userContext.roomCode])

  if (data === null) return <></>
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flexGrow={1}>
        <div className={styles.background} />
        <Typography className={styles.question}>{data.question}</Typography>
        {/*TODO change color later */}
        <AnswerResult id={0} style={{ backgroundColor: getColor(0).dark }} />
        <AnswerResult id={1} style={{ width: '80%' }} />
      </Box>
      <Countdown />
    </Box>
  )
}
export default VoteResult
