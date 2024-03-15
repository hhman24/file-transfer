import { useColorScheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import InputAdornment from '@mui/material/InputAdornment';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChatsListItem from './ChatsListItem';

function ChatsPane({ chats, setSelectedChat, selectedChatId }) {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <Box
        sx={{
          bgcolor: (theme) => theme.devSchema.bgColorHeader,
          position: 'sticky',
          zIndex: 100,
          top: 0,
          left: 0,
          borderBottom: '1px solid',
          borderColor: 'divider',
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
                fontSize: { xs: '0.75rem', md: '1.25rem' },
                fontWeight: '600',
              }}
            >
              Message
            </Typography>
            <Chip
              label={`4`}
              size="small"
              sx={{
                bgcolor: '#E3EFFB',
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
          >
            <EditNoteRoundedIcon />
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
        {chats.map((chat) => (
          <ChatsListItem key={chat.id} {...chat} setSelectedChat={setSelectedChat} selectedChatId={selectedChatId} />
        ))}
      </List>
    </>
  );
}

export default ChatsPane;
