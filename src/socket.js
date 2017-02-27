const ws = require('ws');

const w = new ws.Server({
  port: 7777,
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
    ws.send("you've joined the game, waiting for another player to join");
  } else if (queue.length === 2) {
    queue[0].send("a new player has joined");
    ws.send("you've joined the game");

    // create channel
    members = queue.slice(0, 2);
    channel(members, "game begins");
  } else {
    ws.send("you're in a queue to join the game");
  }

  // handle user input
  ws.on('message', (msg) => {
    if (members) {
      channel(members, msg);
    }
  });


  ws.on('close', (evt) => {
    let index = queue.indexOf(ws);
    queue = queue.filter((_,i) => i !== index);
    members = null;

    // end currently running game
    if (index < 2 && queue.length) {
        queue[0].send("your opponent left the game")

        // start a new game
        if (queue[1]) {
          queue[1].send("you're on");
          queue[0].send("a new player has joined")
          members = queue.slice(0, 2);
          channel(members, "new game begins");
        } else {
          queue[0].send("waiting for a new player to join");
        }
      }
    });
});

module.exports = w;
