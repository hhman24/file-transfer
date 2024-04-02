import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { acceptRequest, receiveRequest } from '~/redux/feature/friend/friendSlice';
import { EVENT } from '~/utils/constants';
import { connectSocket, socket } from '~/utils/socket';

export const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.loginState.token);
  const isLogin = useSelector((state) => state.auth.loginState.isLogined);
  const location = useLocation();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.loginState.userInfo._id);

  useEffect(() => {
    if (isLogin) {
      // window.onload = function () {
      //   if (window.location.hash) {
      //     window.location = window.location + '#loaded';
      //     window.location.reload();
      //   }
      // };

      if (!socket) {
        connectSocket(userId);

        // new friend request
        socket.on(EVENT.RECEIVE_FRIEND_REQUEST, (data) => {
          dispatch(receiveRequest(data.conversataion));
        });

        socket.on(EVENT.ACCEPT_FRIEND_REQUEST, (data) => {
          console.log('socket ACCEPT_FRIEND_REQUEST', data);
          dispatch(acceptRequest(data.conversataion));
        });
      }
    }

    return () => {
      socket.off(EVENT.SEND_FRIEND_REQUEST);
      socket.off(EVENT.ACCEPT_FRIEND_REQUEST);
    };
  }, [isLogin, socket]);

  return token === '' && !isLogin ? <Navigate to={'/login'} replace state={{ from: location }} /> : children;
};
