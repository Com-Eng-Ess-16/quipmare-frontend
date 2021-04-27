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
      const res = err.response
      errorContext.setError(
        res.status + (res.status && res.statusText ? ': ' : '') + res.statusText
      )
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
