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
  SEND_TEXT_MESSAGE: 'envet::send_text_msg',
  SEND_FILE_MESSAGE: 'envet::send_file_msg',
  SEND_FRIEND_REQUEST: 'event::send_friend_req',
  RECEIVE_FRIEND_REQUEST: 'event::receive_friend_request',
  ACCEPT_FRIEND_REQUEST: 'event::accept_friend_req',
};

export const REFRESH_TOKEN_STATUS = {
  ACTIVE: 'active',
  REVOKED: 'revoked',
};

export const FRIEND_STATUS = {
  ACCEPTED: 'accepted',
  PENDING: 'pending',
};
