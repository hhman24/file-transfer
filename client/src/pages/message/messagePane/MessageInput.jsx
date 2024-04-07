import { useColorScheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '~/utils/socket';
import { EVENT } from '~/utils/constants';

function MessageInput() {
  const { mode, setMode } = useColorScheme();
  const [textAreaValue, setTextAreaValue] = useState('');
  const textAreaRef = useRef(null);
  const selectedChat = useSelector((state) => state.friends.selectedChat);
  const { userInfo } = useSelector((state) => state.auth.loginState);
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const selectFile = () => fileRef.current?.click();

  const onSubmit = () => {
    socket.emit(
      EVENT.SEND_TEXT_MESSAGE,
      {
        fromId: userInfo._id,
        toId: selectedChat.friend._id,
        conversation: selectedChat._id,
        content: textAreaValue,
        metaURL: '',
      },
      (response) => {
        console.log(response);
      },
    );
  };

  const handleClick = () => {
    if (textAreaValue.trim() !== '') {
      onSubmit();
      setTextAreaValue('');
    }
  };

  const handleFileChange = async (e, key) => {};

  return (
    <FormControl sx={{ width: '100%' }}>
      <Box
        sx={{
          px: 2,
          pb: 3,
          display: 'flex',
          alignItems: 'end',
          gap: 1,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <IconButton
          variant="outlined"
          color="neutral"
          sx={{
            bgcolor: (theme) => (mode === 'light' ? 'primary.main' : theme.devSchema.secondaryDark),
            '& .MuiIconButton-root': {
              padding: '0 0',
            },
            '& .MuiTouchRipple-child': { borderRadius: 'inherit' },
            '& .MuiSvgIcon-root': { color: 'whitesmoke', fontSize: '14px' },
            '&:hover': {
              bgcolor: (theme) => (mode === 'light' ? 'primary.main' : theme.devSchema.secondaryDark),
            },
            '&:active': {
              bgcolor: (theme) => (mode === 'light' ? 'primary.main' : theme.devSchema.secondaryDark),
            },
          }}
          onClick={selectFile}
        >
          <AddIcon sx={{ fontSize: '24px' }} />
          <input
            ref={fileRef}
            type="file"
            onChange={(e) => handleFileChange(e, 'Files')}
            style={{
              clip: 'rect(0 0 0 0)',
              clipPath: 'inset(50%)',
              height: 1,
              overflow: 'hidden',
              position: 'absolute',
              bottom: 0,
              left: 0,
              whiteSpace: 'nowrap',
              width: 1,
              display: 'none',
            }}
          />
        </IconButton>
        <Input
          id="input-with-message"
          aria-label="Message"
          inputRef={textAreaRef}
          multiline
          disableUnderline
          fullWidth
          placeholder="Type something here…"
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          value={textAreaValue}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            // alignSelf: 'flex-end',
            '& .MuiInputBase-input': {
              borderRadius: '20px',
              position: 'relative',
              backgroundColor: mode === 'light' ? '#F3F6F9' : '#1A2027',
              border: '2px solid',
              borderColor: mode === 'light' ? '#E0E3E7' : '#2D3843',
              padding: '8px 12px',
              transform: 'translateY(10px)',
            },
          }}
        />
        <IconButton
          variant="outlined"
          color="neutral"
          onClick={handleClick}
          sx={{
            '& .MuiIconButton-root': {
              padding: '0 0',
            },
            '& .MuiTouchRipple-child': { borderRadius: 'inherit' },
            '& .MuiSvgIcon-root': {
              color: (theme) => (mode === 'light' ? 'primary.main' : theme.devSchema.secondaryDark),
              fontSize: '23px',
            },
            transform: 'translateY(5px)',
          }}
        >
          <SendIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </FormControl>
  );
}

export default MessageInput;
