import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core'
import theme from 'config/theme'
import Header from 'components/shell/Header'
import Pages from 'components/pages'
import { UserProvider } from 'context/context'
import initFirebase from './initFirebase'

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
    <ThemeProvider theme={theme}>
      <UserProvider>
        <div className={styles.container}>
          <Header />
          <body className={styles.body}>
            <Pages />
          </body>
        </div>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
