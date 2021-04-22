import { useContext } from 'react'
import { PlayerContext, UserContext } from 'context/context'
import { postStartGame } from 'utils/apiService'

const { Typography, Button } = require('@material-ui/core')

function WaitingRoom() {
  const userContext = useContext(UserContext)
  const playerContext = useContext(PlayerContext)
  if (playerContext.player === null) return <></>
  return (
    <>
      <Typography>{userContext.roomCode}</Typography>

      <Typography>playerList</Typography>
      {Object.keys(playerContext.player).map((key) => {
        return <Typography>{playerContext.player[key]}</Typography>
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
