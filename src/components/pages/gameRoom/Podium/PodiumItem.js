import { makeStyles, Typography } from '@material-ui/core'
import { getColor } from 'utils/colorUtil'

const useStyles = makeStyles((theme) => ({
  container: {
    width: (props) => props.size,
    height: (props) => props.size,
    borderRadius: '1000px',
    backgroundColor: (props) => props.color.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid black',
    margin: '10px',
  },
  score: {
    fontFamily: 'Architects Daughter',
  },
}))
function PodiumItem(props) {
  const { size, fontSize, score, style } = props
  const username = 'test'
  const color = '0'
  const styles = useStyles({ size, color: getColor(color), fontSize })
  return (
    <div className={styles.container} style={style}>
      <Typography variant="h3" className={styles.username}>
        {username}
      </Typography>
      <Typography variant="h6" className={styles.score}>
        {score + ' points'}
      </Typography>
    </div>
  )
}
export default PodiumItem
