import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

let theme = createMuiTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0, // small smartphone
      sm: 375, // smartphone
      md: 600, // tablet
      lg: 1024, // desktop
      xl: 1920, // large desktop
    },
  },
  palette: {
    primary: {
      main: '#7C3D02', //brown
      contrastText: '#FFFFFF', //white
      light: '#C4B1A9', //light brown
      dark: '#4A4A4A', //dark grey
    },
  },
  typography: {
    fontFamily: ['Amatic SC', 'Architects Daughter'].join(','),
    h1: {
      fontSize: '7.5rem',
    },
    h2: {
      fontSize: '6rem',
    },
    h3: {
      fontSize: '5.25rem',
    },
    h4: {
      fontSize: '4.5rem',
    },
    h5: {
      fontSize: '4rem',
    },
    h6: {
      fontSize: '3rem',
    },
  },
})

theme = responsiveFontSizes(theme)
export default theme
