import IconButton from '@mui/material/IconButton';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useColorScheme } from '@mui/material/styles';
import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import moment from 'moment';

function NotifyButton() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { notify } = useSelector((state) => state.friends);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Notification">
        <IconButton
          color="inherit"
          size="small"
          sx={{
            borderRadius: '10px',
            '& svg': {
              transition: '0.2s',
              transform: 'translateX(0) rotate(0)',
            },
            '&:hover, &:focus': {
              color: 'primary.main',
            },
            '& .MuiTouchRipple-child': { borderRadius: 'inherit' },
            transition: (theme) => theme.transitions.create(['color']),
          }}
          id="demo-customized-notify"
          aria-controls={open ? 'demo-customized-notify' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          // color='text.primary'
          // disableElevation
          onClick={handleClick}
        >
          <Badge anchorOrigin={{ vertical: 'top', horizontal: 'right' }} variant="dot" overlap="circular" color="error">
            <NotificationsNoneOutlinedIcon fontSize="inherit" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        id="demo-customized-notify"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-notify',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={(theme) => ({
          '& .MuiPaper-root': {
            borderRadius: 2,
            marginTop: theme.spacing(1),
            maxWidth: 300,

            color: mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
              'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
              padding: '4px 0',
            },
          },
          boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          '& .MuiMenu-list': {
            padding: '4px 0',
          },
          '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: theme.palette.text.secondary,
              marginRight: theme.spacing(1.5),
            },
            '&:active': {
              backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
            display: 'flex',
            flexDirection: 'column',
            whiteSpace: 'normal',
          },
        })}
      >
        {notify.map((n, index) => {
          return (
            <div key={index}>
              <MenuItem onClick={handleClose} disableRipple>
                <Typography>{n.message}</Typography>
                <Stack direction={'row'} flexDirection={'row-reverse'} alignSelf={'flex-end'}>
                  <Typography variant="caption">{moment(n.createAt).fromNow()}</Typography>
                </Stack>
              </MenuItem>
              <Divider sx={{ marginBottom: '0 !important', marginTop: '0 !important' }} />
            </div>
          );
        })}
      </Menu>
    </>
  );
}

export default NotifyButton;
