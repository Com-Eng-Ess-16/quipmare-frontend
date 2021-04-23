import { Button, Typography } from '@material-ui/core'
import { UserContext } from 'context/context'
import { useContext, useEffect, useState } from 'react'
import { getStanding, postBackToWaiting } from 'utils/apiService'
function Podium() {
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
      {userContext.userID === 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            postBackToWaiting(userContext.roomCode)
          }}
        >
          Back to waiting room
        </Button>
      )}
    </>
  )
}
export default Podium
