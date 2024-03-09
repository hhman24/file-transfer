import { useColorScheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import Box from '@mui/material/Box';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

  // console.log('dark mode: ', prefersDarkMode);
  // console.log('light mode: ', prefersLightMode);
  return (
    <Box sx={{ border: '1px solid', overflow: 'hidden', borderRadius: '50%'}}>
      <IconButton
        color="inherit"
        onClick={() => {
          const newMode = mode === 'light' ? 'dark' : 'light';
          setMode(newMode);
          localStorage.setItem('mode', newMode);
        }}
      >
        {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
      </IconButton>
    </Box>
  );
}

export default ModeToggle;
