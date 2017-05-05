/* modules */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, } from 'react-redux';
import { createStore, applyMiddleware, } from 'redux';
import socketStarter, { socketsMiddleware, } from './sockets.js';

/* components */
import App from './app.jsx';

/* redux stuff*/
import reducers from './reducers/index.js';

const createStoreWithMiddleware = applyMiddleware(socketsMiddleware)(createStore);

const store = createStoreWithMiddleware(
  reducers, window.devToolsExtension && window.devToolsExtension()
);

socketStarter(store);

ReactDOM.render(
  (<Provider store={ store} >
    <App />
  </Provider>),
  document.getElementById('root')
);
