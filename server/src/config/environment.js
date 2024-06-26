/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import 'dotenv/config';

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.MONGODB_URI,

  APP_PORT: process.env.APP_PORT,
  APP_HOST: process.env.APP_HOST,

  BUILD_MODE: process.env.BUILD_MODE,

  SALT: process.env.SALT,
  ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  TOKEN_LIFE: 60 * 60 * 2,
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,

  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  REDIRECT_URI: process.env.REDIRECT_URI,
};
