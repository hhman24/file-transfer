/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import 'dotenv/config';

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.MONGODB_URI,

  APP_PORT: process.env.APP_PORT,
  APP_HOST: process.env.APP_HOST,

  BUILD_MODE: process.env.BUILD_MODE
};
