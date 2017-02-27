const w = require('./socket.js');

module.exports = (request, response) => { response.file('./public/index.html'); }
