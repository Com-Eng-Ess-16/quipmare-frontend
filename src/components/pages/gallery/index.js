import { Typography } from '@material-ui/core'

function Gallery(props) {
  const gameID = props.match.params.id
  return <Typography>{gameID}</Typography>
}
export default Gallery
