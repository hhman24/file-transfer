export const sendMessageEvent = (io, socket) => async (payload, callback) => {
  console.log(`send text msg event has been received with ${JSON.stringify(payload)} 🍅🍋`);

  // data: {frinedId, conversation, content, metaURL = ''}

  // send msg service to conversation

  // emit incomming msg -> to friendId

  // emit outgoing msg -> from user
};

export const sendFileMessageEvent = (io, socket) => async (payload, callback) => {
  console.log(`send file msg event has been received with ${JSON.stringify(payload)} 🍅🍋`);

  // data: {frinedId, conversation, content = '', metaURL}

  // get file extension

  // upload file to aws s3

  // emit incomming msg -> to friendId

  // emit outgoing msg -> from user
};
