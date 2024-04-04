import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import HeaderMessagePane from './HeaderMessagePane';
import Stack from '@mui/material/Stack';
import AvatarWithStatus from '~/components/avatar/AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { getMsg } from '~/redux/feature/message/messageSlice';
import NoChat from '~/components/noChat/NoChat';

function MessagePane() {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.friends.selectedChat);
  const userInfo = useSelector((state) => state.auth.loginState.userInfo);
  const messages = useSelector((state) => state.message.message);

  const refLastestMsg = useRef();

  useEffect(() => {
    refLastestMsg.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  useEffect(() => {
    // setChatMessages(chat.messages);
    if (selectedChat) dispatch(getMsg({ id: selectedChat._id, page: 1, limit: 10 }));
  }, [dispatch, selectedChat]);

  return !selectedChat ? (
    <NoChat />
  ) : (
    <>
      <HeaderMessagePane sender={selectedChat?.friend} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          p: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent={'flex-end'} ref={refLastestMsg}>
          {messages.map((message, index) => {
            const isYou = message.sendById !== selectedChat.friend._id;
            return (
              <Stack key={index} direction={'row'} gap={1} flexDirection={isYou ? 'row-reverse' : 'row'}>
                {!isYou ? (
                  <AvatarWithStatus online={selectedChat.friend.online} senderName={selectedChat.friend.username} />
                ) : (
                  <AvatarWithStatus online={selectedChat.friend.online} senderName={userInfo.username} />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} message={message} friend={selectedChat.friend} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput />
    </>
  );
}

export default MessagePane;
