import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { useError } from 'components/common/Error'
import Loading from 'components/common/Loading'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStanding, postBackToWaiting } from 'utils/apiService'
import { useAppController } from 'utils/appController'
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
  brownButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
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
  const appController = useAppController()
  const [data, setData] = useState(null)
  const styles = useStyles()
  const setError = useError()
  useEffect(() => {
    async function getData() {
      try {
        const res = await getStanding(appController.gameID)
        setData(res.score[0])
      } catch (err) {
        setError(err)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appController.roomCode])
  const returnToLobby = async () => {
    try {
      await postBackToWaiting(appController.roomCode)
    } catch (err) {
      setError(err)
    }
  }
  if (data === null) return <Loading />
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
        data={data}
        style={{ margin: 'auto' }}
      />
      <div className={styles.buttonContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={styles.button}
          onClick={() => appController.kickPlayer()}
        >
          LEAVE
        </Button>
        <Link
          to={'/gallery/' + appController.gameID}
          style={{ textDecoration: 'none' }}
        >
          <Button
            variant="contained"
            color="primary"
            className={styles.button + ' ' + styles.brownButton}
            style={{ width: '100%' }}
          >
            Gallery
          </Button>
        </Link>
        {String(appController.userID) === String(0) && (
          <Button
            variant="contained"
            color="primary"
            className={styles.button + ' ' + styles.brownButton}
            onClick={returnToLobby}
          >
            return to lobby
          </Button>
        )}
      </div>
    </Box>
  )
}
export default Podium
