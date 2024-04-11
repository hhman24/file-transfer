import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import HeaderMessagePane from './HeaderMessagePane';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AvatarWithStatus from '~/components/avatar/AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import NoChat from '~/components/noChat/NoChat';
import { useDispatch, useSelector } from 'react-redux';
import { getMsg, reSetPageNum, reSetStateMsg, setPageNum } from '~/redux/feature/message/messageSlice';
import { toast } from 'react-toastify';
import { TOAST_ERROR_CSS } from '~/utils/constants';

function MessagePane() {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.friends.selectedChat);
  const lastMsg = selectedChat.lastMessage;
  const userInfo = useSelector((state) => state.auth.loginState.userInfo);
  const { message, error, pageNum } = useSelector((state) => state.message);

  const [hasNextPage, setHashNextPage] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [firstFetchTimeMsg, setFirstFetchTimeMsg] = useState(null);

  const refLastestMsg = useRef();
  const intObserver = useRef();
  const oldMsgRef = useCallback(
    (msg) => {
      if (isFetching) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((msg) => {
        if (msg[0].isIntersecting && hasNextPage) {
          console.log('We are near the old message!');
          dispatch(setPageNum());
        }
      });

      if (msg) intObserver.current.observe(msg);
    },
    [isFetching, hasNextPage],
  );

  useEffect(() => {
    refLastestMsg.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [lastMsg]);

  // For selectedChat change
  useEffect(() => {
    if (selectedChat) {
      dispatch(reSetStateMsg());

      const timestamp = selectedChat.lastMessage ? new Date(selectedChat.lastMessage.createdAt) : new Date();
      setFirstFetchTimeMsg(timestamp);
      
      dispatch(getMsg({ id: selectedChat._id, page: 1, limit: 10, date: timestamp }))
        .unwrap()
        .then((data) => {
          setHashNextPage(Boolean(data.results.length));
          refLastestMsg.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        })
        .catch(() => {
          setFetching(false);
          toast(`🔥🔥 ${error}!`, TOAST_ERROR_CSS);
        });
    }
  }, [dispatch, selectedChat._id]);

  useEffect(() => {
    if (selectedChat && pageNum > 1 && hasNextPage) {
      setFetching(true);

      dispatch(getMsg({ id: selectedChat._id, page: pageNum, limit: 10, date: firstFetchTimeMsg }))
        .unwrap()
        .then((data) => {
          setHashNextPage(Boolean(data.results.length));
          setFetching(false);
        })
        .catch(() => {
          setFetching(false);
          toast(`🔥🔥 ${error}!`, TOAST_ERROR_CSS);
        });
    }
  }, [pageNum]);

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
        <Stack spacing={2} justifyContent={'flex-end'}>
          {isFetching && (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
          {message?.map((message, index) => {
            const isYou = message.sendById !== selectedChat.friend._id;

            // Observer
            if (index === 0) {
              return (
                <Stack
                  ref={oldMsgRef}
                  key={index}
                  direction={'row'}
                  gap={1}
                  flexDirection={isYou ? 'row-reverse' : 'row'}
                >
                  {!isYou ? (
                    <AvatarWithStatus online={selectedChat.friend.online} senderName={selectedChat.friend.username} />
                  ) : (
                    <AvatarWithStatus online={selectedChat.friend.online} senderName={userInfo.username} />
                  )}
                  <ChatBubble variant={isYou ? 'sent' : 'received'} message={message} friend={selectedChat.friend} />
                </Stack>
              );
            }

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
          <div ref={refLastestMsg} />
        </Stack>
      </Box>
      <MessageInput />
    </>
  );
}

export default MessagePane;
