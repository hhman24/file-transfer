import { useColorScheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import Box from '@mui/material/Box';

function ModeToggle({ border = '0.5px solid', radius = '50%', fontSize = 'small' }) {
  const { mode, setMode } = useColorScheme();
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

  // console.log('dark mode: ', prefersDarkMode);
  // console.log('light mode: ', prefersLightMode);
  return (
    <Box sx={{ border: border, overflow: 'hidden', borderRadius: radius }}>
      <IconButton
        color="inherit"
        size={fontSize}
        onClick={() => {
          const newMode = mode === 'light' ? 'dark' : 'light';
          setMode(newMode);
          localStorage.setItem('mode', newMode);
        }}
        sx={{
          display: { xs: 'none', sm: 'inline-flex' },
          borderRadius: radius,
          '& .MuiTouchRipple-child': { borderRadius: 'inherit' },
          transition: (theme) => theme.transitions.create(['color']),
          '&:hover': {
            color: 'primary.main'
          }
        }}
      >
        {mode === 'dark' ? <LightModeRoundedIcon fontSize="inherit" /> : <DarkModeRoundedIcon fontSize="inherit" />}
      </IconButton>
    </Box>
  );
}

export default ModeToggle;
