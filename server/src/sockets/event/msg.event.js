export const sendMessageEvent = (io, socket) => async (payload, callback) => {
  console.log(`send msg event has been received with ${JSON.stringify(payload)} 🍅🍋`);
};
