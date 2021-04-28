import { Box, makeStyles } from '@material-ui/core'
import Countdown from 'components/common/Countdown'
import { UserContext } from 'context/context'
import { useContext, useEffect, useState } from 'react'
import { getStanding } from 'utils/apiService'
import { useColor } from 'utils/colorUtil'
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
  const userContext = useContext(UserContext)
  const [score, setScore] = useState(null)
  const getColor = useColor()
  const styles = useStyles({ color: getColor() })
  useEffect(() => {
    async function getData() {
      const res = await getStanding(userContext.roomCode)
      setScore(res)
    }
    getData()
  }, [userContext.roomCode])
  if (score === null) return <></>
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box flexGrow={1}>
        <div className={styles.background} />
        <StandingItem win />
        <StandingItem />
        <StandingItem />
        {/* {Object.keys(score).map((key) => {
          return (
            <StandingItem />
            // <Typography>
            //   {key.toString() + ': ' + score[key].toString()}
            // </Typography>
          )
        })} */}
      </Box>
      <Countdown />
    </Box>
  )
}
export default Standing
