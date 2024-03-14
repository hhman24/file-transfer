import { experimental_extendTheme as extendTheme} from '@mui/material/styles';

// create theme instance
const theme = extendTheme({
    devSchema: {
      lightBgBoxColor: 'rgba(255 255 255 / 0.2)',
      darkBgBoxColor: 'rgba(19 19 24 / 0.4)',
      heightHeader: 72,
      bgColorHeader: '#FBFCFE'
    },
    colorSchemes: {
      light: {
        palette: {
          // primary: {
          //   main: pink[600],
          // },
        }
      },
      dark: {
        palette: {
          // primary: {
          //   main: pink[400],
          // },
        }
      }
    },
    // ...other properties
  });

export default theme;
