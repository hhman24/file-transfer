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
