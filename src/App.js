import React from 'react'
import { makeStyles } from '@material-ui/core'
import Header from 'components/shell/Header'
import Pages from 'components/pages'
import { initFirebase } from 'utils/firebaseUtil'
import Div100vh from 'react-div-100vh'
import Error from 'components/common/Error'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Gallery from 'components/pages/gallery'

const useStyles = makeStyles((theme) => ({
  container: {
    overflowX: 'hidden',
    height: '100%',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  body: {
    height: '100%',
    maxWidth: '1000px',
    width: '90%',
    margin: 'auto',
    display: 'block',
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
}))

function App() {
  initFirebase()
  const styles = useStyles()
  return (
    <Div100vh>
      <div className={styles.container}>
        <Header />
        <div className={styles.body}>
          <BrowserRouter>
            <Switch>
              <Route path={'/gallery/:id'} exact component={Gallery} />
              <Route path={'*'} exact component={Pages} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
      <Error />
    </Div100vh>
  )
}

export default App
