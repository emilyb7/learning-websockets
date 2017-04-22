import { actionNewPlayer, messageSent, actionOpponentMove, } from './actions.js';

let socket;

export const socketsMiddleware = (store) =>
next =>
action => {
  const result = next(action);
  if (socket && action.type === 'MOVE') {
    const openMessages = store.getState().messages.filter(ms => !ms.sent);
    if (openMessages.length) {
      openMessages.forEach(ms => {
        socket.send(ms.message);
      });
      store.dispatch(messageSent());
    }
  }
  return result;
};

export default (store) => {

  const url = location.origin.replace(/^http/, "ws");
  socket = new WebSocket(url);

  socket.onopen = (event) => {
    console.log("socket opened");
  }

  socket.onclose = (event) => {
    console.log("disconnected");
  }

  socket.onmessage = ({ data, }) => {
    const response = JSON.parse(data);
    switch(response.type) {
      case 'NEW_PLAYERS':
        store.dispatch(actionNewPlayer(response.playerid));
        break;
      case 'OPPONENT-MOVE':
        store.dispatch(actionOpponentMove(response.player, response.space));
        break;
      default:
        console.log(response.message);
    };
  };
};
