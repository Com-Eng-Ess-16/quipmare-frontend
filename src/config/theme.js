import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

let theme = createMuiTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0, // small smartphone
      sm: 375, // smartphone
      md: 600, // tablet
      lg: 1024, // desktop
      xl: 1920, // large desktop
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
