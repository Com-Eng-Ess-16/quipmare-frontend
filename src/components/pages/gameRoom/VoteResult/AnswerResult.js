import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { getColor } from 'utils/colorUtil'
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
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
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}))

function AnswerResult(props) {
  const name = 'PKhing'
  const answer = 'Never'

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const vote = [0, 1, 2, 3, 4, 5, 6, 7]
  const styles = useStyles({ color: 'white' })
  const spectator = 5
  return (
    <div className={styles.container} style={props.style}>
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
        <Typography className={styles.text}>{answer}</Typography>
      </div>
      <div className={styles.voteContainer}>
        {vote.map((val) => {
          return (
            <div
              className={styles.color}
              style={{ backgroundColor: getColor(0).dark }}
            ></div>
          )
        })}
        <Typography variant="h6">{'+' + spectator}</Typography>
      </div>
    </div>
  )
}
export default AnswerResult
