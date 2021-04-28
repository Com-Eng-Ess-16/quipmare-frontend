import { PlayerContext, UserContext } from 'context/context'
import { useContext } from 'react'

const color = {
  0: {
    // green
    light: '#93C588',
    dark: '#557B4D',
  },
  1: {
    // light blue
    light: '#769AE3',
    dark: '#425F99',
  },
  2: {
    // orange
    light: '#F2B86D',
    dark: '#BD7A27',
  },
  3: {
    // red
    light: '#E88E87',
    dark: '#BF4B44',
  },
  4: {
    // blue
    light: '#AB97FD',
    dark: '#5F48C6',
  },
  5: {
    // lighter blue
    light: '#7CDCFE',
    dark: '#1A97C1',
  },
  6: {
    // purple
    light: '#E288FF',
    dark: '#933FAF',
  },
  7: {
    light: '#FFFFDC',
    dark: '#DAC452',
  },
}

export const useColor = () => {
  const userContext = useContext(UserContext)
  const playerContext = useContext(PlayerContext)
  const getColor = (id) => {
    if (!id) {
      if (userContext.userType === 'spectate') {
        id = -1
      }
      const userID = userContext.userID
      if (userID && playerContext.player[userID]) {
        id = playerContext.player[userID].color
      } else {
        id = -1
      }
    }

    if (0 <= id && id <= 7) {
      return color[id]
    }
    return {
      light: '#FFFFFF',
      dark: '#A4A4A4',
    }
  }
  return getColor
}
