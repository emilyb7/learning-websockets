import Store from './reducers/index.js';

console.log("web socketing");

const url = location.origin.replace(/^http/, "ws") + "/echo";

const socket = new WebSocket(url);

socket.onopen = function (event) {
  console.log("socket opened");
}

socket.onclose = function (event) {
  console.log("disconnected");
}

export default socket;
