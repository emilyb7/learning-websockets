import move from './move.js';
import send from './send-message.js';

const defaultState = {
  currentPlayer: null,
  players: [
    {
      id: 0,
      name: "player1",
      counter: "",
      currentPlayer: false,
    },
    {
      id: 1,
      name: "player2",
      counter: "",
      currentPlayer: false,
    },
],
  game: {
    board: [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]],
    player: 0,
    round: 0,
    win: null,
  },
  messages: [],
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'MOVE': return move(state, action);
    case 'NEW-PLAYERS': return Object.assign({}, state, { currentPlayer: action.response.playerid, });
    case 'OPPONENT-MOVE': return oppenentMove(state, action);
    case 'SEND': return send(state, action);
    default:
      return state;
  }
};
