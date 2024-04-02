import { useColorScheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ChatsListItem from './ChatsListItem';
import Skeleton from '@mui/material/Skeleton';
import { toggleMessagesPane } from '~/utils/toggleMessagePane';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';
import { getListFriends } from '~/redux/feature/friend/friendSlice';
import { setClose, setOpen } from '~/redux/feature/dialog/dialogSlice';
import Friends from '~/components/dialog/Friends';

function ChatsPane() {
  const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch();
  const { listFriend, selectedChat, isLoading, error } = useSelector((state) => state.friends);
  const { open } = useSelector((state) => state.dialog);

  useEffect(() => {
    if (error) {
      toast(`🔥🔥 ${error}!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(getListFriends());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            left: 0,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: (theme) => (mode === 'light' ? theme.devSchema.mainLight : theme.devSchema.mainDark),
          }}
        >
          {/* header */}
          <Stack
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={2}
            pb={1.5}
            display={'flex'}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Typography
                component={'h1'}
                sx={{
                  mr: 'auto',
                  fontSize: { xs: '1.25rem', md: '1.25rem' },
                  fontWeight: '600',
                }}
              >
                Message
              </Typography>
              <Chip
                label={`4`}
                size="small"
                sx={{
                  bgcolor: (theme) =>
                    mode === 'light' ? theme.devSchema.secondaryLight : theme.devSchema.secondaryDark,
                  '& .MuiChip-label': {
                    fontWeight: '500',
                  },
                }}
              />
            </Box>
            <IconButton
              variant="plain"
              aria-label="edit"
              color="neutral"
              size="small"
              sx={{
                borderRadius: '10px',
                '& .MuiTouchRipple-child': { borderRadius: 'inherit' },
                display: { xs: 'none', sm: 'flex' },
              }}
              onClick={() => {
                dispatch(setOpen());
              }}
            >
              <PeopleOutlineIcon />
            </IconButton>
            <IconButton
              variant="plain"
              aria-label="edit"
              color="neutral"
              size="small"
              sx={{
                borderRadius: '10px',
                '& .MuiTouchRipple-child': { borderRadius: 'inherit' },
                display: { sm: 'none' },
              }}
              onClick={() => toggleMessagesPane()}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          {/* Search */}
          <Box sx={{ px: 2, pb: 1.5 }}>
            <Input
              id="search-with-adornment"
              placeholder="Search"
              fullWidth
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <SearchRoundedIcon color="neutral" fontSize="small" />
                </InputAdornment>
              }
              sx={{
                alignSelf: 'center',
                paddingX: '2px',
                paddingLeft: '4px',
                border: '2px solid',
                borderColor: mode === 'light' ? '#d0d7de' : '#3c424b',
                borderRadius: '5px',
                transition: (theme) => theme.transitions.create(['borderColor']),
                '&:focus-within': {
                  borderColor: 'primary.main',
                  '& .MuiSvgIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Body */}
        <List
          sx={{
            py: 0,
            '& .MuiListItem-root': {
              paddingY: '0.75rem',
              paddingX: '1rem',
            },
          }}
        >
          {isLoading ? (
            <Stack spacing={1}>
              {Array(7)
                .fill(null)
                .map((_, key) => {
                  return <Skeleton key={key} variant="rectangular" height={60} animation="wave" />;
                })}
              <Skeleton variant="rectangular" height={60} animation="wave" />
            </Stack>
          ) : (
            listFriend.map((f) => <ChatsListItem key={f._id} chat={f} selectedChat={selectedChat} />)
          )}
        </List>
      </Box>
      {open && (
        <Friends
          open={open}
          handleClose={() => {
            dispatch(setClose());
          }}
        />
      )}
    </>
  );
}

export default ChatsPane;
