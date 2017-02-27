const ws = require('ws');

const url = require('url');

const w = new ws.Server({
  port: 8080,
  perMessageDeflate: false,
});

let queue = [];

w.on('connection', (ws) => {
  queue = queue.concat(ws);
  if (queue.length === 2) {
    queue[0].send("a new player has joined");
  }
  ws.on('message', (msg) => {
    console.log(`received ${msg}`);
  });

  ws.on('close', (evt) => {
    console.log("disconnecting");

    console.log(evt);
    let index = queue.indexOf(ws);
    queue = queue.filter((_,i) => i !== index);
    if (index < 2) {
        queue[0].send("your opponent left the game")
        if (queue[1]) {
          queue[1].send("you're on");
          queue[0].send("a new player has joined")
        }
      }
    });

  if (queue.indexOf(ws) < 2) {
    ws.send("game");
  } else {
    ws.send("queue");
  }
});

module.exports = w;
