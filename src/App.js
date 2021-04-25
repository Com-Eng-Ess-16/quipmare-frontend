import React from 'react'
import { makeStyles } from '@material-ui/core'
import Header from 'components/shell/Header'
import Pages from 'components/pages'
import { initFirebase } from 'utils/firebaseUtil'
import Div100vh from 'react-div-100vh'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  body: {
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
          <Pages />
        </div>
      </div>
    </Div100vh>
  )
}

export default App
