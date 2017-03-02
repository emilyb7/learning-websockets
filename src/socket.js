const ws = require('ws');

const server = require('./../server.js');

const w = new ws.Server({
  server: server,
  port: 8000,
  perMessageDeflate: false,
});

let queue = [];
let members = null;

// potensh refactor using a class?
const channel = (membersArr, message) => {
  membersArr.forEach(member => {
    member.send(message);
  });
};

w.on('connection', (ws) => {
  queue = queue.concat(ws);

  // start game
  if (queue.length === 1) {
    ws.send(JSON.stringify({
      type: "welcome",
      message: "You've joined the game, waiting for another player to join",
    }));
  } else if (queue.length === 2) {
    queue[0].send(JSON.stringify({
      type: "NEW-PLAYERS",
      message: "another player has joined the game",
      playerid: 0,
    }));
    ws.send(JSON.stringify({
      type: "NEW-PLAYERS",
      message: "You've joined the game",
      playerid: 1,
    }));

    // create channel
    members = queue.slice(0, 2);
    channel(members, JSON.stringify({
      type: "init",
      message: "game begins",
    }));
  } else {
    ws.send(JSON.stringify({
      type: "queue",
      message: "you're in a queue to join the game",
    }));
  }

  // handle user input
  ws.on('message', (msg) => {
    if (members) {
      console.log(msg);
      channel(members, msg);
    }
  });


  ws.on('close', (evt) => {
    let index = queue.indexOf(ws);
    queue = queue.filter((_,i) => i !== index);
    members = null;

    // end currently running game
    if (index < 2 && queue.length) {
        queue[0].send(JSON.stringify({
          type: "player-leaves",
          message: "your opponent has left the game",
        }));

        // start a new game
        if (queue[1]) {
          queue[1].send(JSON.stringify({
            type: "NEW-PLAYERS",
            message: "you're on",
            playerid: 1,
          }));
          queue[0].send(JSON.stringify({
            type: "NEW-PLAYERS",
            message: "a new player has joined",
            playerid: 0,
          }))
          members = queue.slice(0, 2);
          channel(members, {
            type: "init",
            message: "new game begins",
          });
        } else {
          queue[0].send(JSON.stringify({
            type: "waiting",
            message: "waiting for a new player to join",
          }));
        }
      }
    });
});

module.exports = w;
