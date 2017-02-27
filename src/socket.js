const ws = require('ws');

const w = new ws.Server({
  port: 8080,
  perMessageDeflate: false,
});

w.on('connection', (ws) => {
  ws.on('message', (msg) => {
    console.log(`received ${msg}`);
    ws.send(`from server -- ${msg}`);
  });

  ws.send("something");
});

module.exports = w;
