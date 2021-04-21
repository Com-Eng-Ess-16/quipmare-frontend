import { Typography } from '@material-ui/core'
import { UserContext } from 'context/context'
import { useContext, useEffect, useState } from 'react'
import { getStanding } from 'utils/apiService'
function Podium() {
  const userContext = useContext(UserContext)
  const [score, setScore] = useState(null)
  useEffect(() => {
    async function getData() {
      const res = await getStanding(userContext.roomID)
      setScore(res)
    }
    getData()
  }, [userContext.roomID])
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
    </>
  )
}
export default Podium
