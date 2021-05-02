import { Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Profile from './profile'
import RoomCodeInput from './roomCodeInput'
import { useIndexStyles } from './styles'
import { useAppController } from 'utils/appController'
import Loading from 'components/common/Loading'

function Home() {
  const styles = useIndexStyles()
  const [action, setAction] = useState('')
  const appController = useAppController()

  if (action === '')
    return (
      <div className={styles.page}>
        <div>
          <Typography className={styles.gameTitle}>
            The Greatest Jester
          </Typography>
        </div>
        <div className={styles.buttons}>
          <Button
            className={styles.joinButton}
            color="primary"
            variant="outlined"
            onClick={() => setAction('join')}
          >
            join
          </Button>
        </div>
        <div className={styles.buttons}>
          <Button
            className={styles.spectateButton}
            color="primary"
            variant="outlined"
            onClick={() => setAction('spectate')}
          >
            spectate
          </Button>
          <Button
            className={styles.hostButton}
            color="primary"
            variant="outlined"
            onClick={() => appController.createRoom(setAction)}
          >
            host
          </Button>
        </div>
      </div>
    )
  if (appController.roomCode !== null) return <Profile action={action} />
  if (action === 'join' || action === 'spectate')
    return <RoomCodeInput action={action} setAction={setAction} />
  return <Loading />
}
export default Home
