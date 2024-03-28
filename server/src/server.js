// eslint-disable no-console
import exitHook from 'async-exit-hook';
import express from 'express';
import cors from 'cors';
import cookie from 'cookie-parser';
// import morgan from 'morgan';
import { corsOptions } from './config/cors';
import { env } from '~/config/environment';
import { Loggers } from '~/middlewares/logger.middleware';
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb';
import { errorHandlingMiddleware } from '~/middlewares/errorHandler.middleware';
import { API_v1 } from '~/routes/v1';
import { SOCKET_IO } from './sockets/socket';

const START_SERVER = () => {
  const app = express();

  // create server http for socket io
  const { server } = SOCKET_IO.SocketInit(app);

  app.use(cors(corsOptions)); // setup cors
  app.use(Loggers.logger);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookie());

  // use API v1
  app.use('/v1', API_v1);

  // Middleware for socket

  // Listen event
  SOCKET_IO.onConnection();

  // Middlewares xử lý tập trung lỗi
  app.use(errorHandlingMiddleware);

  // // Middleware để tạo delay
  // function delayResponse(req, res, next) {
  //   const delayTime = 2000; // Thời gian trễ 2 giây (2000 milliseconds)
  //   setTimeout(next, delayTime);
  // }
  // app.use(delayResponse);

  server.listen(env.APP_PORT, () => {
    console.log(`3. Server is running on http://${env.APP_HOST}:${env.APP_PORT}`);
  });

  // thực hiện các tác vụ cleanup trk khi dừng server
  // link: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(() => {
    console.log('4. Disconnecting from MongoDB...');
    CLOSE_DB();
    console.log('5. Disconnected from MongoDB');
  });
};

// (IIFE) Immediately-invoke / Anomynous Async function
(async () => {
  try {
    console.log('1. Connecting to MongoDB...');
    await CONNECT_DB();
    console.log('2. Connected to MongoDB Cloud Atlas');

    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
