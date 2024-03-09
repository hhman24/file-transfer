import { experimental_extendTheme as extendTheme} from '@mui/material/styles';
import { pink } from '@mui/material/colors';

// create theme instance
const theme = extendTheme({
    devSchema: {
      lightBgBoxColor: 'rgba(255 255 255 / 0.2)',
      darkBgBoxColor: 'rgba(19 19 24 / 0.4)',
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