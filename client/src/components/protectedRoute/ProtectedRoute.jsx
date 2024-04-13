import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { acceptRequest, receiveRequest, setLastMessageSelectedChat } from '~/redux/feature/friend/friendSlice';
import { sendMsg } from '~/redux/feature/message/messageSlice';
import { EVENT } from '~/utils/constants';
// import { generateKey } from '~/utils/generateKey';
import { connectSocket, socket } from '~/utils/socket';

export const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.loginState.token);
  const isLogin = useSelector((state) => state.auth.loginState.isLogined);
  const location = useLocation();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.loginState.userInfo?._id);
  // const privateKey = useSelector((state) => state.auth.loginState.privateKey);
  // const selectedChat = useSelector((state) => state.friends.selectedChat);

  useEffect(() => {
    if (isLogin) {
      // window.onload = function () {
      //   if (window.location.hash) {
      //     window.location = window.location + '#loaded';
      //     window.location.reload();
      //   }
      // };

      if (!socket) {
        if (!userId) return;
        connectSocket(userId);

        // new friend request
        socket.on(EVENT.RECEIVE_FRIEND_REQUEST, (data) => {
          dispatch(receiveRequest(data.conversataion));
        });

        socket.on(EVENT.ACCEPT_FRIEND_REQUEST, (data) => {
          const f = data.conversataion;

          dispatch(acceptRequest({ ...f })); // encode base-64
        });

        socket.on(EVENT.SEEN_MESSAGE, (data) => {
          console.log('socket SEEN_MESSAGE', data.lastMessage);

          dispatch(setLastMessageSelectedChat(data.lastMessage ? { ...data.lastMessage } : null));
        });

        socket.on(EVENT.NEW_MESSAGE, (data) => {
          console.log('socket NEW_MESSAGE', data.message);

          dispatch(sendMsg({ ...data.message }));
          // dispatch(setLastMessageSelectedChat({ ...data.message }));
        });
      }
    }

    return () => {
      console.log('off event');
      socket?.off(EVENT.SEND_FRIEND_REQUEST);
      socket?.off(EVENT.ACCEPT_FRIEND_REQUEST);
      socket?.off(EVENT.SEEN_MESSAGE);
      socket?.off(EVENT.NEW_MESSAGE);
    };
  }, [isLogin, dispatch, userId]);

  return token === '' && !isLogin ? <Navigate to={'/login'} replace state={{ from: location }} /> : children;
};
