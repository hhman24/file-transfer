import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// create theme instance
const theme = extendTheme({
  devSchema: {
    lightBgBoxColor: 'rgba(255 255 255 / 0.2)',
    darkBgBoxColor: 'rgba(19 19 24 / 0.4)',
    heightHeader: 72,
    bgColorHeader: '#FBFCFE',
    mainLight: '#FBFCFE',
    mainDark: '#171A1C',
    secondaryDark: '#12467B',
    secondaryLight: '#E3EFFB',
  },
  colorSchemes: {
    light: {
      palette: {
        // primary: {
        //   main: pink[600],
        // },
      },
      background: {
        surface: '#FBFCFE',
      },
    },
    dark: {
      palette: {
        // primary: {
        //   main: pink[400],
        // },
      },
      background: {
        surface: '',
      },
    },
  },
  // ...other properties
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
