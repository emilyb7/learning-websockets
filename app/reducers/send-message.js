import socket from './../sockets.js';

export default (state, action) => {
  const msg = state.messages.find(msg => msg.sent === false).message
  socket.send(msg);

  const sentMessages = state.messages.filter(msg => msg.sent === true);
  const updatedMsg = Object.assign({}, msg, { sent: true, });
  const messages = sentMessages.concat([updatedMsg, ]);
  return Object.assign({}, state, {
    messages: messages,
  });
};
