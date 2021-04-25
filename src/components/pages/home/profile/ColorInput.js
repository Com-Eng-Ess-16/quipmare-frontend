import { makeStyles, Typography } from '@material-ui/core'
import { getColor } from './../../../../utils/colorUtil'
import CheckIcon from '@material-ui/icons/Check'

const useStyles = makeStyles((theme) => ({
  colorButton: {
    width: '80px',
    height: '80px',
    borderRadius: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 15px 0 15px',
    border: '2px solid black',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '50px',
      height: '50px',
      borderRadius: '50px',
      border: '1px solid black',
      margin: '2px 15px 2px 15px',
    },
  },
  colorContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Architects Daughter',
    fontSize: '2.5rem',
    textShadow: '2px 2px #00000020',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
}))

function ColorInput({ color, setColor }) {
  const styles = useStyles()

  const ColorButton = ({ colorID, selected }) => {
    const colorCode = getColor(colorID)
    console.log({ colorID, color })
    console.log(colorID === color)
    return (
      <div
        className={styles.colorButton}
        style={{
          backgroundColor: selected ? 'grey' : colorCode.dark,
        }}
        onClick={() => {
          if (!selected) {
            setColor(colorID)
            console.log(colorID)
          }
        }}
      >
        {colorID === color && <CheckIcon fontSize="large" />}
      </div>
    )
  }

  return (
    <>
      <Typography className={styles.text}>Select your color</Typography>
      <div className={styles.colorContainer}>
        <ColorButton colorID="0" />
        <ColorButton colorID="1" />
        <ColorButton colorID="2" />
      </div>
      <div className={styles.colorContainer}>
        <ColorButton colorID="3" />
        <ColorButton colorID="4" />
      </div>
      <div className={styles.colorContainer}>
        <ColorButton colorID="5" />
        <ColorButton colorID="6" />
        <ColorButton colorID="7" />
      </div>
    </>
  )
}
export default ColorInput
