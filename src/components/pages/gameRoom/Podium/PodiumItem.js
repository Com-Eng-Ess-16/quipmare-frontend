import { makeStyles, Typography } from '@material-ui/core'
import { useAppController } from 'utils/appController'

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
function PodiumItem({ size, data, style }) {
  const appController = useAppController()
  const styles = useStyles({
    size,
    color: appController.getColor(data.color),
  })
  return (
    <div className={styles.container} style={style}>
      <Typography variant="h3" className={styles.username}>
        {data.username}
      </Typography>
      <Typography variant="h6" className={styles.score}>
        {data.point + ' points'}
      </Typography>
    </div>
  )
}
export default PodiumItem
