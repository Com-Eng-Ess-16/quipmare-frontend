import { makeStyles, Typography } from '@material-ui/core'
import { getColor } from './../../../../utils/colorUtil'
import CheckIcon from '@material-ui/icons/Check'
import { useContext } from 'react'
import { PlayerContext } from 'context/context'

const useStyles = makeStyles((theme) => ({
  colorButton: {
    width: '75px',
    height: '75px',
    borderRadius: '75px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '-1% 3% -1% 3%',
    border: '2px solid black',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '50px',
      height: '50px',
      borderRadius: '50px',
      border: '1px solid black',
      margin: '0% 5% -3% 5%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '40px',
      height: '40px',
      borderRadius: '50px',
      border: '1px solid black',
      margin: '0% 5% -3% 5%',
    },
  },
  colorContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
    [theme.breakpoints.down('sm')]: {
      margin: '5% 0 0% 0',
      fontSize: '1.25rem',
    },
  },
  text: {
    fontFamily: 'Architects Daughter',
    fontSize: '1.5rem',
    textShadow: '2px 2px #00000020',
    margin: '5% 0 5% 0',
    [theme.breakpoints.down('sm')]: {
      margin: '0% 0 5% 0',
      fontSize: '1.25rem',
    },
  },
}))

function ColorInput({ color, setColor }) {
  const styles = useStyles()
  const playerContext = useContext(PlayerContext)

  const isSelected = (colorID) => {
    for (let player in playerContext.player) {
      if (playerContext.player[player].color === colorID) return true
    }
    return false
  }

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

  if (isSelected(color)) setColor(-1)
  return (
    <>
      <Typography className={styles.text}>Select your color</Typography>
      <div className={styles.colorContainer}>
        <ColorButton colorID={0} selected={isSelected(0)} />
        <ColorButton colorID={1} selected={isSelected(1)} />
        <ColorButton colorID={2} selected={isSelected(2)} />
      </div>
      <div className={styles.colorContainer}>
        <ColorButton colorID={3} selected={isSelected(3)} />
        <ColorButton colorID={4} selected={isSelected(4)} />
      </div>
      <div className={styles.colorContainer}>
        <ColorButton colorID={5} selected={isSelected(5)} />
        <ColorButton colorID={6} selected={isSelected(6)} />
        <ColorButton colorID={7} selected={isSelected(7)} />
      </div>
    </>
  )
}
export default ColorInput
