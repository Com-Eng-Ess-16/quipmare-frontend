import { makeStyles, Snackbar } from '@material-ui/core'
import { ErrorContext } from 'context/context'
import { useContext } from 'react'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: 'Roboto',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
}))

function useError() {
  const errorContext = useContext(ErrorContext)
  const setError = (err) => {
    if (err.response) {
      const status = err.response.status
      let text = err.response.statusText
      if (status === 404 && text === '') text = 'Not Found'

      errorContext.setError(status + (status && text ? ': ' : '') + text)
      console.log(err.response)
    } else if (ErrorEvent.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      errorContext.setError('Request Error: no response was received')
      console.log(err.request)
    } else {
      // Something happened in setting up the request and triggered an Error
      errorContext.setError('Error: Cannot set up the request')
      console.log('Error', err.message)
    }
    errorContext.setOpen(true)
  }
  return setError
}

function Alert(props) {
  return <MuiAlert elevation={12} variant="filled" {...props} />
}
function Error() {
  const styles = useStyles()
  const errorContext = useContext(ErrorContext)
  const handleClose = () => {
    errorContext.setOpen(false)
  }
  return (
    <Snackbar
      open={errorContext.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      style={{ width: '100%' }}
    >
      <Alert onClose={handleClose} severity="error" className={styles.text}>
        {errorContext.error}
      </Alert>
    </Snackbar>
  )
}
export default Error
export { useError }
