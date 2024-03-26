import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import HeaderMessagePane from './HeaderMessagePane';
import Stack from '@mui/material/Stack';
import AvatarWithStatus from '~/components/avatar/AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { getMsg } from '~/redux/feature/message/messageSlice';

function MessagePane() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.friends.selectedChat);
  const messages = useSelector((state) => state.message.message);

  useEffect(() => {
    // setChatMessages(chat.messages);
    if (selectedChat) dispatch(getMsg({ id: selectedChat._id, page: 1, limit: 10 }));
  }, [dispatch, selectedChat]);

  return (
    <>
      <HeaderMessagePane sender={selectedChat?.friend} />
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
          {messages.map((message, index) => {
            const isYou = message.sendById !== selectedChat.friend._id;
            return (
              <Stack key={index} direction={'row'} spacing={2} flexDirection={isYou ? 'row-reverse' : 'row'}>
                {!isYou && <AvatarWithStatus online={message.sender.online} senderName={message.sender.name} />}
                <ChatBubble variant={isYou ? 'sent' : 'received'} message={message} friend={selectedChat.friend} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          // const newId = chatMessages.length + 1;
          // const newIdString = newId.toString();
          // setChatMessages([
          //   ...chatMessages,
          //   {
          //     id: newIdString,
          //     sender: 'You',
          //     content: textAreaValue,
          //     timestamp: 'Just now',
          //   },
          // ]);
        }}
      />
    </>
  );
}

export default MessagePane;
