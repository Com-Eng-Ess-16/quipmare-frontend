import React from 'react'
import { makeStyles } from '@material-ui/core'
import Header from 'components/shell/Header'
import Pages from 'components/pages'
import { initFirebase } from 'utils/firebaseUtil'

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
  },
  body: {
    maxWidth: '1000px',
    margin: 'auto',
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
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Pages />
      </div>
    </div>
  )
}

export default App
