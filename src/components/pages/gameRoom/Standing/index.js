import { Typography } from '@material-ui/core'
import Countdown from 'components/common/Countdown'
import { UserContext } from 'context/context'
import { useContext, useEffect, useState } from 'react'
import { getStanding } from 'utils/apiService'

function Standing() {
  const userContext = useContext(UserContext)
  const [score, setScore] = useState(null)
  useEffect(() => {
    async function getData() {
      const res = await getStanding(userContext.roomCode)
      setScore(res)
    }
    getData()
  }, [userContext.roomCode])
  if (score === null) return <></>
  return (
    <>
      {Object.keys(score).map((key) => {
        return (
          <Typography>
            {key.toString() + ': ' + score[key].toString()}
          </Typography>
        )
      })}
      <Countdown />
    </>
  )
}
export default Standing
