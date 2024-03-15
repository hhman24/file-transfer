import Stack from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from '~/components/avatar/AvatarWithStatus';

function ChatsListItem(props) {
  const { id, sender, messages, selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === id;

  return (
    <>
      <ListItemButton
        color="neutral"
        selected={selected}
        onClick={() => {
          setSelectedChat({ id, sender, messages });
        }}
        sx={{
          flexDirection: 'column',
          alignItems: 'initial',
          gap: 1,
        }}
      >
        <Stack direction={'row'} spacing={1.5} sx={{ flex: 1 }}>
          <AvatarWithStatus online={sender.online} src={sender.avatar} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitile2" fontSize={'14px'} fontWeight={500}>
              {sender.name}
            </Typography>
            <Typography variant="body2" fontWeight={300} fontSize={'13px'} color="text.tertiary">
              {sender.username}
            </Typography>
          </Box>
          <Box
            sx={{
              lineHeight: 1.5,
              textAlign: 'right',
            }}
          >
            {messages[0].unread && <CircleIcon sx={{ fontSize: 12 }} color="primary" />}
            <Typography
              display={{
                xs: 'none',
                md: 'block',
              }}
              noWrap
              variant="body2"
            >
              5 mins ago
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
          {messages[0].content}
        </Typography>
      </ListItemButton>
      <Divider sx={{ margin: 0 }} />
    </>
  );
}

export default ChatsListItem;
