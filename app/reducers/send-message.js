import socket from './../sockets.js';

export default (state) => {

  console.log("message");
  const msg = state.messages.find(msg => !msg.sent).message
  socket.send(msg);

  const sentMessages = state.messages.filter(msg => msg.sent);
  const updatedMsg = Object.assign({}, msg, { sent: true, });
  const messages = sentMessages.concat([ updatedMsg, ]);
  return Object.assign({}, state, {
    messages: messages,
  });
};
