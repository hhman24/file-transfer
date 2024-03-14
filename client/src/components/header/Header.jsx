import { useColorScheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import ModeToggle from '~/components/toggle/ModeToggle';
import Workspaces from './menus/workspaces';
import DrawerNav from './drawer/DrawerNav';
import AvatarCus from './avatar/AvatarCus';

function Header() {
  const { mode, setMode } = useColorScheme();

  return (
    <Box
      p={1}
      px={3}
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: (theme) => mode === 'light' ? theme.devSchema.bgColorHeader : ''
      }}
    >
      {/* left */}
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignContent={'center'}
        spacing={3}
        sx={{
          display: { xs: 'none', sm: 'flex' }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <div className="icon_container">
            <SendIcon className="svg__icon" color="primary" />
          </div>
          <Typography fontSize="1.2rem" fontWeight="bold" variant="span">
            Capstone 2024 Chat
          </Typography>
        </Box>

        <Stack
          direction={'row'}
          justifyContent={'center'}
          alignContent={'center'}
          sx={{
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          <Button
            variant="plain"
            aria-pressed="true"
            component="a"
            href="/email/"
            size="small"
            sx={{ alignSelf: 'center' }}
          >
            Email
          </Button>
          <Button variant="plain" color="neutral" component="a" href="/team/" size="small" sx={{ alignSelf: 'center' }}>
            Team
          </Button>
          <Button
            variant="plain"
            color="neutral"
            component="a"
            href="/files/"
            // size="small"
            sx={{ alignSelf: 'center' }}
          >
            Files
          </Button>

          <Workspaces />
        </Stack>
      </Stack>

      {/* Screen mobile */}
      <DrawerNav />

      {/* right */}
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          alignItems: 'center'
        }}
      >
        <Input
          id="input-with-icon-adornment"
          placeholder="Search anything"
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon color="primary" fontSize="small" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                variant="outlined"
                color="neutral"
                size="small"
                sx={{
                  bgcolor: mode === 'light' ? '#F3F6F9' : '#1A2027',
                  borderRadius: '5px',
                  '& .MuiIconButton-root': {
                    padding: '0 0'
                  },
                  '& .MuiTouchRipple-child': { borderRadius: 'inherit' },
                  '& MuiTypography-root': {
                    lineHeight: 0
                  }
                }}
              >
                <Typography fontSize={'12px'} textColor="text.icon">
                  ⌘ K
                </Typography>
              </IconButton>
            </InputAdornment>
          }
          sx={{
            alignSelf: 'center',
            paddingX: '2px',
            paddingLeft: '4px',
            display: {
              xs: 'none',
              sm: 'flex'
            },
            border: '1px solid',
            borderColor: mode === 'light' ? '#d0d7de' : '#3c424b',
            borderRadius: '5px',
            width: '24ch',
            transition: (theme) => theme.transitions.create(['width']),
            '&:focus-within': {
              borderColor: 'primary.main',
              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.5)',
              width: '32ch'
            }
          }}
        />

        <IconButton
          color="inherit"
          size="small"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            borderRadius: '10px',
            '& .MuiTouchRipple-child': { borderRadius: 'inherit' },
            transition: (theme) => theme.transitions.create(['color']),
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          <LanguageRoundedIcon fontSize="inherit" />
        </IconButton>
        <ModeToggle border="none" radius="10px" />

        <AvatarCus />
      </Box>
    </Box>
  );
}

export default Header;
