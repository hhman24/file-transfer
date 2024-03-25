import { env } from '~/config/environment';

// Những domain được truy cập vào tài nguyên
export const WHITELIST_DOMAINS = [
  // `http://${env.APP_HOST}:${env.APP_PORT}`,
  `http://${env.APP_HOST}:${3000}`,
];

// export const CHAT_TYPE = {
//   PUBLIC: 'public',
//   PRIVATE: 'private'
// };

export const REFRESH_TOKEN_STATUS = {
  ACTIVE: 'active',
  REVOKED: 'revoked',
};

export const FRIEND_STATUS = {
  ACCEPTED: 'accepted',
  PENDING: 'pending',
};
