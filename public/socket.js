console.log("web socketing");

var url = "ws://localhost:8080/echo";

var socket = new WebSocket(url);

socket.onopen = function (event) {
  socket.send("hello server");
}

socket.onmessage = function (event) {
  console.log(event.data);
}

socket.onclose = function (event) {
  console.log("disconnected");
}
