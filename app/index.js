/* modules */
import React from 'react';
import ReactDOM from 'react-dom';

/* components */
import App from './components/app.js';

/* redux stuff*/
import Store from './reducers/index.js';
import { createStore } from 'redux';
const store = createStore(Store);

console.log("web socketing");

var url = "ws://localhost:7777/echo";

var socket = new WebSocket(url);

socket.onopen = function (event) {
  console.log("socket opened");

}

socket.onmessage = function (event) {
  console.log(event.data);
  const response = JSON.parse(event.data);
  store.dispatch({ type: response.type, response: response})
}

socket.onclose = function (event) {
  console.log("disconnected");
}

const render = () => ReactDOM.render(<App store={store} socket={socket}/>, document.getElementById('root'));

render();

store.subscribe(render);
