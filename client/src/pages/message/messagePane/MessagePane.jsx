import { useColorScheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import HeaderMessagePane from './HeaderMessagePane';
import Stack from '@mui/material/Stack';
import AvatarWithStatus from '~/components/avatar/AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';

function MessagePane(props) {
  const { chat } = props;
  const { mode, setMode } = useColorScheme();
  const [chatMessages, setChatMessages] = useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

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
          {chatMessages.map((message, index) => {
            const isYou = message.sender === 'You';
            return (
              <Stack key={index} direction={'row'} spacing={2} flexDirection={isYou ? 'row-reverse' : 'row'}>
                {message.sender !== 'You' && (
                  <AvatarWithStatus online={message.sender.online} senderName={message.sender.name} />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          const newId = chatMessages.length + 1;
          const newIdString = newId.toString();
          setChatMessages([
            ...chatMessages,
            {
              id: newIdString,
              sender: 'You',
              content: textAreaValue,
              timestamp: 'Just now',
            },
          ]);
        }}
      />
    </>
  );
}

export default MessagePane;
