// eslint-disable no-console

/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { env } from '~/config/environment';
import exitHook from 'async-exit-hook';
import express from 'express';
import cookie from 'cookie-parser';
import { Loggers } from '~/middlewares/logger.middleware';
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb';
import { errorHandlingMiddleware } from '~/middlewares/errorHandler.middleware';
import { API_v1 } from '~/routes/v1';

const START_SERVER = () => {
  const app = express();

  app.use(Loggers.logger);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookie());
  // use API v1
  app.use('/v1', API_v1);

  // Middlewares xử lý tập trung lỗi
  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Server is running on ${env.APP_HOST}:${env.APP_PORT}/`);
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
