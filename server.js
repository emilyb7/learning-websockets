const Hapi = require('hapi');
const express = require('express');
const path = require('path');
const Inert = require('inert');
const ws = require('ws');

const PORT = process.env.PORT || 7000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  //.use('/bundle.js', express.static(path.join(__dirname, 'bundle.js')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});
