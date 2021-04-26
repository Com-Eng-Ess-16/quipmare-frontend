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
    margin: '0 5% 0 5%',
    border: '2px solid black',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
      borderRadius: '60px',
      border: '1px solid black',
      margin: '0% 5% -3% 5%',
    },
  },
  colorContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px'
  },
  text: {
    fontFamily: 'Architects Daughter',
    fontSize: '2rem',
    textShadow: '2px 2px #00000020',
    margin: '5% 0 5% 0',
    [theme.breakpoints.down('sm')]: {
      margin: '0% 0 5% 0',
      fontSize: '1.8rem',
    },
  },
}))

function ColorInput({ color, setColor }) {
  const styles = useStyles()

  const ColorButton = ({ colorID, selected }) => {
    const colorCode = getColor(colorID)
    return (
      <div
        className={styles.colorButton}
        style={{
          backgroundColor: selected ? 'grey' : colorCode.dark,
        }}
        onClick={() => {
          if (!selected) {
            setColor(colorID)
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
