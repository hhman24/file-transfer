import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ShowPrivateKey({ open, handleClose, privateKey }) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const navigate = useNavigate();

  const handleShowPrivateKey = () => {
    setShowPrivateKey(!showPrivateKey);
  };

  const handleCopyClipBoard = () => {
    navigator.clipboard.writeText(privateKey);
  };

  const handleExportPrivateKey = () => {
    const textFile = new Blob([privateKey], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.download = 'privateKey.txt';
    downloadLink.href = window.URL.createObjectURL(textFile);
    downloadLink.click();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{ p: 4, zIndex: 10000 }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Your Private key</DialogTitle>
        <DialogContent>
          <Stack direction={'row'} display={'flex'} alignItems={'center'} spacing={1} mb={1}>
            <Typography variant="h6">Private Key</Typography>
            <Tooltip title="Export" placement="bottom" slotProps={{ popper: { disablePortal: true } }}>
              <FileDownloadOutlinedIcon
                sx={{ fontSize: '14px', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                onClick={handleExportPrivateKey}
              />
            </Tooltip>

            <Tooltip title="Copy" placement="bottom" slotProps={{ popper: { disablePortal: true } }}>
              <ContentCopyIcon
                sx={{ fontSize: '14px', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                onClick={handleCopyClipBoard}
              />
            </Tooltip>
          </Stack>
          <TextField
            id="private key"
            type={showPrivateKey ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={privateKey}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ visibility: 'hidden' }}>
                  <IconButton aria-label="toggle password visibility" onClick={handleShowPrivateKey} edge="end">
                    {showPrivateKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: 2,

              backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027'),
              '& .MuiInputBase-input': {
                color: 'black',
              },

              '& .MuiInputAdornment-root': {
                mx: 1,
                borderRadius: 2,
                backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027'),
              },
              '&:hover': {
                '& .MuiInputAdornment-root': {
                  visibility: 'visible',
                },
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderRadius: 2,
                  borderWidth: '2px',
                },
                transition: (theme) => theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              navigate('/login');
            }}
          >
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default ShowPrivateKey;
