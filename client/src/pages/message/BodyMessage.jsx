import { useState } from 'react';
import Box from '@mui/material/Box';
import ChatsPane from './chatsPane/ChatsPane';
import { chats } from '~/data/messagesData';
import MessagePane from './messagePane/MessagePane';

function BodyMessage() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);

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
          width: '100%',
          height: 'calc(100dvh - var(--Header-height))',
          overflowY: 'auto',
          position: { xs: 'fixed', sm: 'sticky' },
          top: 200,
          right: 0,
          mt: '58px',
        }}
      >
        <ChatsPane chats={chats} selectedChatId={selectedChat.id} setSelectedChat={setSelectedChat} />
      </Box>
      <Box
        sx={{
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          height: 'calc(100dvh - var(--Header-height))',
          display: 'flex',
          flexDirection: 'column',
          mt: '58px',
        }}
      >
        <MessagePane chat={selectedChat} />
      </Box>

      <Box
        sx={{
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: {
            xs: 'none',
            md: 'initial',
          },
          mt: '58px',
        }}
      >
        <div>ga3</div>
      </Box>
    </>
  );
}

export default BodyMessage;
