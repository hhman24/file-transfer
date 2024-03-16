import { useColorScheme } from '@mui/material/styles';
import { useState } from 'react';
import Box from '@mui/material/Box';
import HeaderMessagePane from './HeaderMessagePane';
import Stack from '@mui/material/Stack';
import AvatarWithStatus from '~/components/avatar/AvatarWithStatus';
import ChatBubble from './ChatBubble';

function MessagePane(props) {
  const { chat } = props;
  const { mode, setMode } = useColorScheme();
  const [chatMessages, setChatMessages] = useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = useState('');
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <HeaderMessagePane sender={chat.sender} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent={'flex-end'}>
          {chatMessages?.map((message, index) => {
            const isYou = message.sender === 'You';
            return (
              <Stack key={index} direction={'row'} spacing={2} flexDirection={isYou ? 'row-reverse' : 'row'}>
                {message.sender !== 'You' && (
                  <AvatarWithStatus online={message.sender.online} src={message.sender.avatar} />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      {/* <Box
        width={'100%'}
        sx={{
          borderRight: '1px solid',
          borderColor: 'divider',
          // width: { xs: '100%', sm: '70%' },
          transition: 'transform 0.4s, width 0.4s',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: (theme) =>
            mode === 'light' ? theme.devSchema.backgroundLevel1Light : theme.devSchema.backgroundLevel1Dark,
        }}
      >
      </Box> */}
      {/* <Box
        width={isOpen ? '30%' : '0'}
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesSettingPane-slideIn, 0) + 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          width: { xs: '100%', sm: '30%' },
          top: 0,
          right: 0,
          zIndex: 9999,
          mt: '58px',
        }}
      >
        ga
      </Box> */}
    </>
  );
}

export default MessagePane;
