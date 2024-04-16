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
import { EVENT, TOAST_ERROR_CSS } from '~/utils/constants';
import { toast } from 'react-toastify';
import FilePrev from './FilePrev';
import { generateKey } from '~/utils/generateKey';
import { useAxios } from '~/apis/axiosConfig';
import { fileHandle } from '~/utils/file';

function MessageInput() {
  const { mode, setMode } = useColorScheme();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [metaData, setMetaData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const selectedChat = useSelector((state) => state.friends.selectedChat);
  const { userInfo, token } = useSelector((state) => state.auth.loginState);
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);
  const fileRef = useRef(null);
  const selectFile = () => fileRef.current?.click();

  const axios = useAxios(token, dispatch);

  const onSubmit = (url) => {
    // encrypt msg befor emit
    if (!selectedChat.keyAES) {
      console.log(selectedChat);
      return;
    }
    const encryptedContent = generateKey.encryptData(textAreaValue, atob(selectedChat.keyAES));

    // object metaData {url, fileName, size }
    // update lên cloud....
    const encryptedURL = url ? generateKey.encryptData(url, atob(selectedChat.keyAES)) : null;

    socket.emit(
      EVENT.SEND_TEXT_MESSAGE,
      {
        fromId: userInfo._id,
        toId: selectedChat.friend._id,
        conversation: selectedChat._id,
        content: encryptedContent,
        metaData: url ? { fileName: selectedFile.name, url: encryptedURL, size: `${selectedFile.size}` } : null,
      },
      (response) => {
        console.log(response);
      },
    );
  };

  const handleClick = async () => {
    try {
      if (textAreaValue.trim() !== '' || selectedFile) {
        // upload cloud if selectedFile not null
        const url = selectedFile ? await handleUpload() : null;

        console.log('url ', url);
        onSubmit(url);
        setTextAreaValue('');
        setSelectedFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    try {
      const files = e.target.files[0];

      if (!files) return;

      const limit = 5000;

      const size = files.size / 1024;

      if (size > limit) {
        const err = new Error(`file too big: ${(size / 1000).toFixed(2)} MB`);
        // toast
        toast(`🔥🔥 ${err.message}!`, TOAST_ERROR_CSS);
        return;
      }

      // update file to state to render
      setSelectedFile(files);
      // Automatically create metadata JSON object with file name
      const metadata = { name: files.name };
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });

      setMetaData(metadataBlob);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected.');
        return null;
      }

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(selectedFile);
      const fileData = await new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
      });

      // Send request to get auth token from server
      const controller = new AbortController();
      const response = await axios.get('/upload/token', { signal: controller.signal });

      // Get auth token from server response
      controller.abort();
      const authToken = response.data.access_token || null;

      // If auth token is available, proceed to upload the file to Google Drive
      if (authToken) {
        const driveResponse = await fileHandle.uploadToGoogleDrive(metaData, fileData, authToken);
        console.log('File uploaded successfully:', driveResponse);
        // Get sharable link
        const link = await fileHandle.getSharableLink(driveResponse.id, authToken);
        return link;
      }

      return null;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      {selectedFile && (
        <Box
          sx={{
            px: 2,
            pt: 1,
            display: 'flex',
            alignItems: 'end',
            gap: 1,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <FilePrev
            filename={selectedFile.name}
            size={`${(selectedFile.size / (1024 * 1000)).toFixed(2)} MB`}
            handleClose={() => {
              setSelectedFile(null);
            }}
          />
        </Box>
      )}
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
            onChange={(e) => handleFileChange(e)}
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
