import { makeStyles, Typography } from '@material-ui/core'
import { useColor } from 'utils/colorUtil'

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
function PodiumItem({ size, fontSize, score, style }) {
  const getColor = useColor()
  const username = 'test'
  const styles = useStyles({ size, color: getColor(), fontSize })
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
