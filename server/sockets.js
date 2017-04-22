const ws = require('ws');

const {
  welcome,
  newPlayers,
  init,
  inQueue,
  playerLeaves,
  waiting,
  newMessage,
} = require('./messages.js');

const channel = (membersArr, messageCreator, payload) => {
  membersArr.forEach(member => { sendMessage(member, messageCreator, payload); });
};

const addConnectionToQueue = (queue, connection) => queue.concat([ connection, ]);

const sendMessage = (connection, messageCreator, payload) => {
  const msg = JSON.stringify(messageCreator(payload));
  return connection.send(msg);
};

module.exports = server => {

  const w = new ws.Server({ server });

  let queue = [];
  let members = null;

  w.on('connection', (ws) => {
    queue = addConnectionToQueue(queue, ws);

    // start game
    if (queue.length === 1) {
      sendMessage(ws, welcome, null);
    } else if (queue.length === 2) {
      sendMessage(queue[0], newPlayers, 0);
      sendMessage(ws, newPlayers, 1);
      members = queue.slice(0, 2);
      channel(members, init, null);
    } else {
      sendMessage(ws, inQueue, null);
    }

    // handle incoming messages
    ws.on('message', (msg) => {
      if (members) {
        channel(members, newMessage, msg);
      }
    });

    ws.on('close', (evt) => {
      const index = queue.indexOf(ws);
      queue = queue.filter((_,i) => i !== index);
      members = null;

      // end currently running game
      if (index < 2 && queue.length) {
        sendMessage(queue[0], playerLeaves, null);

        // start a new game
        if (queue[1]) {
          members = queue.slice(0, 2);
          sendMessage(members[1], newPlayers, 1);
          sendMessage(members[0], newPlayers, 0);
          channel(members, init, null);
        } else {
          sendMessage(queue[0], waiting, null);
        }
      }
    });
  });
}
