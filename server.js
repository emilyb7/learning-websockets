const express = require('express');
const path = require('path');
const createSocket = require('./server/sockets.js');

const PORT = process.env.PORT || 7000;

const server = express()
  .use('/', express.static(__dirname))
  .use('/css', express.static(__dirname + "/public"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

createSocket(server);
