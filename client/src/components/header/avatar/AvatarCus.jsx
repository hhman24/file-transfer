import { useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

function AvatarCus() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          variant="plain"
          onClick={handleClick}
          size="small"
          sx={{
            ml: 2,
            maxWidth: '32px',
            maxHeight: '32px',
            borderRadius: '9999999px'
          }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            src="https://i.pravatar.cc/40?img=2"
            srcSet="https://i.pravatar.cc/80?img=2"
            sx={{ maxWidth: '32px', maxHeight: '32px' }}
          >
            M
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            marginTop: (theme) => theme.spacing(1),
            minWidth: 180,
            color: (theme) => (mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300]),
            boxShadow:
              'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
              padding: 1,
              '& .MuiMenuItem-root': {
                display: 'flex',
                gap: 2,
                borderRadius: '6px'
              }
            }
          }
        }}
      >
        <MenuItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/40?img=2"
              srcSet="https://i.pravatar.cc/80?img=2"
              sx={{ borderRadius: '50%' }}
            />

            <Box sx={{ ml: 1.5 }}>
              <Typography variant="subtitile2" fontWeight={500} color={'text.primary'} gutterBottom>
                Ainz Gold
              </Typography>
              <Typography variant="body2" color="text.tertiary" gutterBottom>
                hhman@gmail.com
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <Divider sx={{ my: 0.5, mx: -1 }} />
        <MenuItem>
          <HelpRoundedIcon sx={{ fontSize: '20px' }} />
          Help
        </MenuItem>
        <MenuItem>
          <SettingsRoundedIcon sx={{ fontSize: '20px' }} />
          Settings
        </MenuItem>
        <Divider sx={{ my: 0.5, mx: -1 }} />
        <MenuItem>
          <LogoutRoundedIcon sx={{ fontSize: '20px' }} />
          Log out
        </MenuItem>
      </Menu>
    </>
  );
}

export default AvatarCus;
