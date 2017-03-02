/* modules */
import React from 'react';
import ReactDOM from 'react-dom';

/* components */
import App from './components/app.js';

/* redux stuff*/
import Store from './reducers/index.js';
import { createStore } from 'redux';
const store = createStore(Store);

import socket from './sockets.js';

socket.onmessage = (event) => {
  console.log(event.data);
  const response = JSON.parse(event.data);
  store.dispatch({ type: response.type, response: response})
}

const render = () => ReactDOM.render(<App store={store} socket={socket}/>, document.getElementById('root'));

render();

store.subscribe(render);
