import { useState } from 'react';
import { IconButton, useColorScheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import moment from 'moment';

function ChatBubble(props) {
  const { variant, message, friend } = props;
  const isSent = variant === 'sent';
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCelebrated, setIsCelebrated] = useState(false);
  const { mode, setMode } = useColorScheme();

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
      {message.metaURL ? (
        <Box
          sx={{
            backgroundColor: (theme) =>
              mode === 'light' ? theme.devSchema.backgroundBodyLight : theme.devSchema.backgroundBodyDark,
            border: '2px solid',
            borderColor: 'divider',
            px: 1.75,
            py: 1.25,
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
              <Typography fontSize={'12px'}>{message.metaURL}</Typography>
              <Typography variant="body2" fontSize={'12px'}>
                {message.metaURL}
              </Typography>
            </div>
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Box
            sx={{
              p: 1.25,
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
