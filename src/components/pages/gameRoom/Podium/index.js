import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import PodiumItem from './PodiumItem'
const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: '-10px',
    fontSize: '3.5rem',
    fontFamily: 'Architects Daughter',
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
      fontSize: '3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.75rem',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '20px',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'stretch',
    },
  },
  button: {
    fontSize: '2rem',
    fontFamily: 'Architects Daughter',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.75rem',
    },
  },
}))
function Podium() {
  const styles = useStyles()
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Typography className={styles.text}>
        And the most popular player are...
      </Typography>

      <PodiumItem
        size={Math.min(
          (80 * window.innerWidth) / 100,
          (60 * window.innerHeight) / 100
        )}
        userID={0}
        score={300}
        style={{ margin: 'auto' }}
      />
      <div className={styles.buttonContainer}>
        <Button variant="outlined" color="primary" className={styles.button}>
          LEAVE
        </Button>
        <Button variant="contained" color="primary" className={styles.button}>
          play again
        </Button>
      </div>
    </Box>
  )
}
export default Podium
