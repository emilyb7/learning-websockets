import Store from './reducers/index.js';

console.log("web socketing");

const url = "ws://localhost:7777/echo";

const socket = new WebSocket(url);

socket.onopen = function (event) {
  console.log("socket opened");
}

// socket.onmessage = function (event) {
//   console.log(event.data);
//   const response = JSON.parse(event.data);
//   store.dispatch({ type: response.type, response: response})
// }

socket.onclose = function (event) {
  console.log("disconnected");
}

export default socket;
