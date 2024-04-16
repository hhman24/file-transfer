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
    backgroundLevel1Light: '#F0F4F8',
    backgroundLevel1Dark: '#171A1C',
    backgroundBodyDark: '#000',
    backgroundBodyLight: '#FFF',
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: '#FBFCFE',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'grey',
            borderRadius: '8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: () => ({}),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          },
          // '& fieldset': {
          //   borderWidth: '1px !important',
          // },
        }),
      },
    },
  },
});

export default theme;
