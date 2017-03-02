import move from './move.js';

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
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'MOVE': return move(state, action);
    case 'NEW-PLAYERS':
      const playerid = action.response.playerid;
      return Object.assign({}, state, { currentPlayer: playerid, })
    default:
      return state;
  }
};
