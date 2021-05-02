import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { useAppController } from 'utils/appController'
const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0px 10px 0px 10px',
    marginTop: '20px',
    background: (props) => props.color,
    border: '1px solid black',
    margin: 'auto',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
  },
  text: {
    fontSize: '2.5rem',
    fontFamily: 'Prompt',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      margin: '0px 0 -5px 0',
    },
  },
  color: {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    margin: '2px 5px 2px 5px',
    border: '1px solid black',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
      margin: '0px 2px 0px 2px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '25px',
      height: '25px',
    },
  },
  voteContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
    marginBottom: '10px',
  },
}))

function AnswerResult({ win, data }) {
  const appController = useAppController()
  const name = appController.player[data.owner].username
  const answer = data.answer ? data.answer : 'No Answer'
  const colorID = appController.player[data.owner].color
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const vote = data.vote ? data.vote : []
  let spectatorVote = 0
  for (let id in vote) {
    if (vote[id].length > 2) {
      spectatorVote++
    }
  }
  const styles = useStyles({
    color: win ? appController.getColor(colorID).dark : 'white',
  })
  return (
    <div className={styles.container} style={{ width: win ? '90%' : '80%' }}>
      <div className={styles.textContainer}>
        <Typography
          className={styles.text}
          style={{
            color: 'white',
            textShadow:
              '-1px 0 1px black, 0 1px 1px black, 1px 0 1px black, 0 -1px 1px black',
            marginRight: '5px',
          }}
        >
          {name + (isSm ? '' : ' > ')}
        </Typography>
        <Typography className={styles.text} style={{ textAlign: 'center' }}>
          {answer}
        </Typography>
      </div>
      <div className={styles.voteContainer}>
        {vote.map((val) => {
          if (val.length > 2) return <></>
          return (
            <div
              className={styles.color}
              style={{
                backgroundColor: appController.getColor(
                  appController.player[val].color
                ).light,
              }}
            ></div>
          )
        })}
        <Typography variant="h6">
          {spectatorVote ? '+' + spectatorVote : ''}
        </Typography>
      </div>
    </div>
  )
}
export default AnswerResult
