import { Button, Typography } from '@material-ui/core'
import Countdown from 'components/common/Countdown'
import { UserContext } from 'context/context'
import { useContext, useEffect, useState } from 'react'
import { getAnswer, postVote } from 'utils/apiService'
function Voting() {
  const [data, setData] = useState(null)
  const userContext = useContext(UserContext)

  useEffect(() => {
    async function getData() {
      const res = await getAnswer(
        userContext.gameData.currentQuestionID,
        userContext.roomID
      )
      setData(res)
    }
    getData()
  }, [userContext.gameData.currentQuestionID, userContext.roomID])
  if (data === null) return <></>
  return (
    <>
      <Typography>{data.question}</Typography>
      {Object.keys(data.answer).map((key) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              postVote(
                userContext.roomCode,
                userContext.userID,
                userContext.gameData.currentQuesitonID,
                key
              )
            }}
          >
            {data.answer[key]}
          </Button>
        )
      })}
      <Countdown />
    </>
  )
}
export default Voting
