import { env } from '~/config/environment';

// Những domain được truy cập vào tài nguyên
export const WHITELIST_DOMAINS = [
  // `http://${env.APP_HOST}:${env.APP_PORT}`,
  `http://${env.APP_HOST}:${3000}`,
  `http://${env.APP_HOST}:${8000}`,
  `http://192.168.220.1:${3000}`,
  `http://192.168.14.1:${3000}`,
  `http://192.168.1.10:${3000}`,
];

// Event
export const EVENT = {
  SEND_MESSAGE: 'envet::sendMsg',
  SEND_FRIEND_REQUEST: 'event::sendFriendReq',
  ACCEPT_FRIEND_REQUEST: 'event::acceptFriendReq',
};

export const REFRESH_TOKEN_STATUS = {
  ACTIVE: 'active',
  REVOKED: 'revoked',
};

export const FRIEND_STATUS = {
  ACCEPTED: 'accepted',
  PENDING: 'pending',
};
