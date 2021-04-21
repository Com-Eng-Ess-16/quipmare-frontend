import { useContext, useEffect, useState } from 'react'
import { UserContext } from 'context/context'
import { Button, TextField, Typography } from '@material-ui/core'
import { getQuestion, postAnswer } from 'utils/apiService'

function Answering() {
  const userContext = useContext(UserContext)
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState('')
  useEffect(() => {
    async function getData() {
      const res = await getQuestion(userContext.gameData.currentQuestionID)
      setQuestion(res.question)
    }
    getData()
  }, [userContext.gameData.currentQuestionID])

  return (
    <>
      <Typography>{question}</Typography>
      <TextField
        multiline
        rowsMax={4}
        value={answer}
        onChange={(event) => {
          setAnswer(event.target.value)
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          postAnswer(userContext.roomCode, userContext.userID)
        }}
      >
        Submit
      </Button>
    </>
  )
}
export default Answering
