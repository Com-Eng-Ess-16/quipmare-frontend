import { Box, makeStyles } from '@material-ui/core'
import Countdown from 'components/common/Countdown'
import { useError } from 'components/common/Error'
import Loading from 'components/common/Loading'
import { useEffect, useState } from 'react'
import { getStanding } from 'utils/apiService'
import { useAppController } from 'utils/appController'
import StandingItem from './StandingItem'
const useStyles = makeStyles((theme) => ({
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
function Standing() {
  const appController = useAppController()
  const [score, setScore] = useState(null)
  const styles = useStyles({ color: appController.getColor() })
  const setError = useError()
  useEffect(() => {
    async function getData() {
      if (appController.gameState !== 'score') return
      try {
        const res = await getStanding(appController.gameID)
        setScore(res.score)
      } catch (err) {
        setError(err)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appController.roomCode, appController.gameState])
  if (score === null)
    return (
      <>
        <div className={styles.background} />
        <Loading />
      </>
    )
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box flexGrow={1}>
        <div className={styles.background} />
        {score.map((val, idx) => {
          return <StandingItem win={idx === 0} data={val} />
        })}
      </Box>
      <Countdown />
    </Box>
  )
}
export default Standing
