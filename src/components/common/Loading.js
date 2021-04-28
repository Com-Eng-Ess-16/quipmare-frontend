import { Box, CircularProgress } from '@material-ui/core'

function Loading() {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress style={{ margin: 'auto' }} />
    </Box>
  )
}
export default Loading
