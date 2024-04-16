import { useState } from 'react';
import { useColorScheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import moment from 'moment';
import { truncateFileName } from '~/utils/truncate';
import { useSelector } from 'react-redux';
import { generateKey } from '~/utils/generateKey';
import { fileHandle } from '~/utils/file';

function ChatBubble(props) {
  const { variant, message, friend } = props;
  const isSent = variant === 'sent';

  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCelebrated, setIsCelebrated] = useState(false);

  const { mode, setMode } = useColorScheme();

  const selectedChat = useSelector((state) => state.friends.selectedChat);

  const handleDownLoad = async () => {
    try {
      if (!selectedChat.keyAES) {
        console.log('No key AES');
        return;
      }

      const decryptedURL = generateKey.decryptData(message.metaData.url, atob(selectedChat.keyAES));

      const fileId = fileHandle.extractFileIdFromUrl(decryptedURL);

      const link = document.createElement('a');
      link.href = `https://drive.google.com/uc?id=${fileId}&export=download`;
      link.setAttribute('download', message.metaData.fileName); // Đặt thuộc tính download cho thẻ a
      document.body.appendChild(link);
      link.click(); // Kích hoạt sự kiện click trên thẻ a
      document.body.removeChild(link); // Xóa thẻ a khỏi DOM sau khi tải xuống
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 0.25 }}>
        <Typography variant="body2" fontWeight={400} fontSize={'12px'} color="text.tertiary">
          {message.sendById === friend._id ? friend.username : 'You'}
        </Typography>
        <Typography variant="body2" fontWeight={400} fontSize={'12px'} color="text.tertiary">
          {moment(message?.createdAt).fromNow()}
        </Typography>
      </Stack>
      {message.metaData && (
        <Box
          sx={{
            backgroundColor: (theme) =>
              mode === 'light' ? theme.devSchema.backgroundBodyLight : theme.devSchema.backgroundBodyDark,
            border: '2px solid',
            borderColor: 'divider',
            px: 1.75,
            py: 1.25,
            mb: 1,
            borderRadius: '12px',
            borderTopRightRadius: isSent ? 0 : '12px',
            borderTopLeftRadius: isSent ? '12px' : 0,
          }}
        >
          <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
            <Avatar sx={{ bgcolor: 'primary.main' }} sizes="small">
              <InsertDriveFileRoundedIcon />
            </Avatar>
            <div>
              <Typography fontSize={'12px'}>{truncateFileName(message.metaData.fileName, 10)}</Typography>
              <Typography variant="body2" fontSize={'12px'}>
                {`${(message?.metaData?.size / (1024 * 1000)).toFixed(2)} MB`}
              </Typography>
            </div>
            <IconButton size="small" color="neutral" onClick={() => handleDownLoad()}>
              <CloudDownloadIcon />
            </IconButton>
          </Stack>
        </Box>
      )}
      {message.content && (
        <Box
          sx={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Box
            sx={{
              p: 1.25,
              minWidth: 'auto',
              borderRadius: '12px',
              borderTopRightRadius: isSent ? 0 : '12px',
              borderTopLeftRadius: isSent ? '12px' : 0,
              backgroundColor: (theme) =>
                mode === 'light'
                  ? isSent
                    ? 'primary.main'
                    : theme.palette.background.paper
                  : isSent
                    ? theme.devSchema.secondaryDark
                    : theme.palette.background.paper,
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
            }}
          >
            <Typography
              level="body2"
              sx={{
                color: (theme) => (isSent ? theme.devSchema.mainLight : 'text.primary'),
              }}
            >
              {message.content}
            </Typography>
          </Box>
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction={'row'}
              justifyContent={isSent ? 'flex-end' : 'flex-start'}
              spacing={0.5}
              sx={{
                position: 'absolute',
                top: '50%',
                p: 1.5,
                ...(isSent
                  ? { left: 0, transform: 'translate(-100%, -50%)' }
                  : { right: 0, transform: 'translate(100%, -50%)' }),
              }}
            >
              <IconButton
                color={isLiked ? 'danger' : 'neutral'}
                size="small"
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? '❤️' : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton
                color={isCelebrated ? 'warning' : 'neutral'}
                size="small"
                onClick={() => setIsCelebrated((prevState) => !prevState)}
              >
                {isCelebrated ? '🎉' : <CelebrationOutlinedIcon />}
              </IconButton>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ChatBubble;
