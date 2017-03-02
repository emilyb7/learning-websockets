const Hapi = require('hapi');
const Inert = require('inert');
const ws = require('ws');

const server = new Hapi.Server();

server.register([Inert], (err) => {

  server.connection({ port: process.env.PORT || 7000, });
  
  server.route(require('./src/routes.js'));

  server.start(() => { console.log((`Server running at: ${server.info.uri}`)); })
});

module.exports = server;
