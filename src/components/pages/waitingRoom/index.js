import { useContext } from 'react'
import { MemberContext, UserContext } from 'context/context'
import { postStartGame } from 'utils/apiService'

const { Typography, Button } = require('@material-ui/core')

function WaitingRoom() {
  const userContext = useContext(UserContext)
  const memberContext = useContext(MemberContext)

  return (
    <>
      <Typography>{userContext.roomCode}</Typography>

      <Typography>memberList</Typography>
      {memberContext.member.map((val, key) => {
        return <Typography>{val}</Typography>
      })}

      {userContext.userID === 0 && (
        <Button variant="contained" color="primary" onClick={postStartGame}>
          start
        </Button>
      )}
    </>
  )
}
export default WaitingRoom
