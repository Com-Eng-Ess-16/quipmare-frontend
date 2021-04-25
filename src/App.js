import React from 'react'
import { makeStyles } from '@material-ui/core'
import Header from 'components/shell/Header'
import Pages from 'components/pages'
import { initFirebase } from 'utils/firebaseUtil'

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '-webkit-fill-available',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
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
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Pages />
      </div>
    </div>
  )
}

export default App
