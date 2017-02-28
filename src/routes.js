module.exports = [
   { method: 'GET', path: '/', handler: require('./index.js') },
   { method: 'GET', path: '/socket.js', handler: (request, response) => { response.file('./public/socket.js') } },
   { method: 'GET', path: '/styles.css', handler: (request, response) => { response.file('./public/styles.css') } },
   { method: 'GET', path: '/bundle.js', handler: (request, response) => { response.file('bundle.js') } },
];
