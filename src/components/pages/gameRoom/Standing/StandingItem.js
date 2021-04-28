import { makeStyles, Typography } from '@material-ui/core'
import { useColor } from 'utils/colorUtil'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: (props) => (props.win ? '#C4B1A9' : '#4A4A4A'),
    border: (props) => (props.win ? '1px solid black' : '1px solid white'),
    display: 'flex',
    alignItems: 'center',
  },
  color: {
    width: '80px',
    margin: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '50px',
      margin: '10px',
    },
    '& div': {
      margin: 'auto',
      borderRadius: '100px',
      width: (props) => (props.win ? '80px' : '50px'),
      height: (props) => (props.win ? '80px' : '50px'),
      border: '1px solid black',
      backgroundColor: (props) => props.color.dark,
      [theme.breakpoints.down('sm')]: {
        width: (props) => (props.win ? '50px' : '30px'),
        height: (props) => (props.win ? '50px' : '30px'),
      },
    },
  },
  text: {
    textShadow: '2px 2px #00000040',
    color: (props) => (props.win ? 'black' : 'white'),
    fontSize: (props) => (props.win ? '3.25rem' : '3rem'),
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: (props) => (props.win ? '2.25rem' : '2rem'),
    },
  },
}))
function StandingItem(props) {
  const { win } = props
  const getColor = useColor()
  const styles = useStyles({ color: getColor(), win })
  const username = 'PKhing'
  const score = 400
  return (
    <div className={styles.container}>
      <div className={styles.color}>
        <div />
      </div>
      <Typography className={styles.text} style={{ flexGrow: 1 }}>
        {username}
      </Typography>
      <Typography className={styles.text}>{score + ' points'}</Typography>
    </div>
  )
}
export default StandingItem
