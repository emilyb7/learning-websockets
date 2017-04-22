const welcome = () => ({
  type: "welcome",
  message: "You've joined the game, waiting for another player to join",
});

const newPlayers = (id) => ({
  type: "NEW_PLAYERS",
  message: "another player has joined the game",
  playerid: id,
});

const init = () => ({
  type: "init",
  message: "game begins",
});

const inQueue = () => ({
  type: "queue",
  message: "you're in a queue to join the game",
});

const playerLeaves = () => ({
  type: "player-leaves",
  message: "your opponent has left the game",
});

const waiting = () => ({
  type: "waiting",
  message: "waiting for a new player to join",
});

const newMessage = (msg) => ({
  type: "NEW_MESSAGE",
  message: msg,
})

module.exports = {
  welcome: welcome,
  newPlayers: newPlayers,
  init: init,
  inQueue: inQueue,
  playerLeaves: playerLeaves,
  waiting: waiting,
  newMessage: newMessage,
};
