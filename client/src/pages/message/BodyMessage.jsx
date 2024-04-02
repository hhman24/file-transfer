import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ChatsPane from './chatsPane/ChatsPane';
import MessagePane from './messagePane/MessagePane';

function BodyMessage() {
  // const [selectedChat, setSelectedChat] = useState(chats[0]);
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <Box
        sx={{
          borderRight: '1px solid',
          borderColor: 'divider',
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          height: 'calc(100dvh - var(--Header-height))',
          overflowY: 'auto',
          position: { xs: 'fixed', sm: 'sticky' },
          top: 0,
          left: 0,
          zIndex: 9999,
          mt: '58px',
          backgroundColor: 'white',
        }}
      >
        {/* chats={chats} selectedChatId={selectedChat.id} setSelectedChat={setSelectedChat} */}
        <ChatsPane />
      </Box>
      <Box
        sx={{
          height: 'calc(100dvh - var(--Header-height))',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          mt: '58px',
          borderRight: '1px solid',
          borderColor: 'divider',
          backgroundColor: (theme) =>
            mode === 'light' ? theme.devSchema.backgroundLevel1Light : theme.devSchema.backgroundLevel1Dark,
        }}
      >
        <MessagePane />
      </Box>
    </>
  );
}

export default BodyMessage;
