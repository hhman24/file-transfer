export const REFRESH_TOKEN_STATUS = {
  ACTIVE: 'active',
  REVOKED: 'revoked',
};

export const FRIEND_STATUS = {
  ACCEPTED: 'accepted',
  PENDING: 'pending',
};

// Event
export const EVENT = {
  SEND_TEXT_MESSAGE: 'event::send_text_msg',
  NEW_MESSAGE: 'event::new_msg',
  SEEN_MESSAGE: 'event::seen_msg',
  START_CONVERSATION: 'event::start_conversation',
  SEND_FILE_MESSAGE: 'event::send_file_msg',
  SEND_FRIEND_REQUEST: 'event::send_friend_req',
  RECEIVE_FRIEND_REQUEST: 'event::receive_friend_request',
  ACCEPT_FRIEND_REQUEST: 'event::accept_friend_req',
};
