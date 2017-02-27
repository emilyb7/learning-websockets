module.exports = [
   { method: 'GET', path: '/', handler: require('./index.js') },
   { method: 'GET', path: '/{file*}', handler: { directory: { path: 'public/' } } },
];
