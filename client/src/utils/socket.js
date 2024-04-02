import io from 'socket.io-client';

let socket;

const connectSocket = (user_id) => {
  socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
    query: `userId=${user_id}`,
  });
};

//

export { socket, connectSocket };
