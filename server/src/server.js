// eslint-disable no-console

/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import dotenv from 'dotenv';
import exitHook from 'async-exit-hook';
import express from 'express';
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb';

dotenv.config();

const START_SERVER = () => {
  const app = express();

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());

    res.end('<h1>Hello World!</h1><hr>');
  });

  app.listen(process.env.APP_PORT, () => {
    console.log(
      `3. Server is running on ${process.env.APP_HOST}:${process.env.APP_PORT}/`
    );
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

// console.log('1. Connecting to MongoDB ...');
// // Chỉ khi kết nối tới mongodb thành công thì mới START_SERVER lên
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB Cloud Atlas'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.log(error);
//     process.exit(0);
//   });
