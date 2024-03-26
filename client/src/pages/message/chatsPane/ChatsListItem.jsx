import Stack from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from '~/components/avatar/AvatarWithStatus';
import { useDispatch } from 'react-redux';
import { setSelectedChat } from '~/redux/feature/friend/friendSlice';
import moment from 'moment';

function ChatsListItem(props) {
  const { chat, selectedChat } = props;
  const dispatch = useDispatch();
  const selected = selectedChat._id === chat._id;

  return (
    <>
      <ListItemButton
        selected={selected}
        onClick={() => {
          dispatch(setSelectedChat(chat));
        }}
        sx={{
          flexDirection: 'column',
          alignItems: 'initial',
          gap: 1,
        }}
      >
        <Stack direction={'row'} spacing={1.5} sx={{ flex: 1 }}>
          <AvatarWithStatus
            online={chat?.friend?.online || false}
            senderName={chat.friend?.username || 'Minh An test'}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitile2" fontSize={'14px'} fontWeight={500}>
              {chat.friend?.username || 'Minh An test'}
            </Typography>
            <Typography variant="body2" fontWeight={300} fontSize={'13px'} color="text.tertiary">
              {chat.friend?.email || 'Minh An test'}
            </Typography>
          </Box>
          <Box
            sx={{
              lineHeight: 1.5,
              textAlign: 'right',
            }}
          >
            {chat?.lastMessage?._unread && <CircleIcon sx={{ fontSize: 12 }} color="primary" />}
            <Typography
              display={{
                xs: 'none',
                md: 'block',
              }}
              noWrap
              variant="body2"
            >
              {chat.lastMessage ? moment(chat?.lastMessage?.createdAt).fromNow() : ''}
            </Typography>
          </Box>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {chat?.lastMessage?.content || ' '}
        </Typography>
      </ListItemButton>
      <Divider sx={{ margin: 0 }} />
    </>
  );
}

export default ChatsListItem;
