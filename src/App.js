import React from 'react'
import { makeStyles } from '@material-ui/core'
import Pages from 'components/pages'
import { initFirebase } from 'utils/firebaseUtil'
import Div100vh from 'react-div-100vh'
import Error from 'components/common/Error'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Gallery from 'components/pages/gallery'
import { useGameUtil } from 'utils/gameUtil'

const useStyles = makeStyles((theme) => ({
  container: {
    overflowX: 'hidden',
    height: '100%',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
}))

function App() {
  initFirebase()
  const gameUtil = useGameUtil()
  gameUtil.rejoin()
  const styles = useStyles()
  return (
    <Div100vh>
      <div className={styles.container}>
        <BrowserRouter>
          <Switch>
            <Route path={'/gallery/:id'} exact component={Gallery} />
            <Route path={'*'} exact component={Pages} />
          </Switch>
        </BrowserRouter>
      </div>
      <Error />
    </Div100vh>
  )
}

export default App
