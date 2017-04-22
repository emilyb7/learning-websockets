import move from './helpers/move.js';
import oppenentMove from './helpers/opponent-move.js';

const initBoard = [
  [undefined,undefined,undefined],
  [undefined,undefined,undefined],
  [undefined,undefined,undefined],
];

const counters = {
  noughts: '0',
  crosses: 'X',
};

const defaultState = {
  currentPlayer: null,
  players: [
    {
      id: 0,
      name: "player1",
      counter: counters.noughts,
      currentPlayer: false,
    },
    {
      id: 1,
      name: "player2",
      counter: counters.crosses,
      currentPlayer: false,
    },
],
  game: {
    board: initBoard,
    player: 0,
    round: 0,
    win: null,
  },
  messages: [],
};

export default (state = defaultState, action) => {

  switch(action.type) {
    case 'MOVE':
      return move(state, action);
    case 'NEW_PLAYERS':
      return {
        ...state,
        currentPlayer: action.playerId,
      }
    case 'OPPONENT-MOVE':
      return oppenentMove(state, action);
    case 'MESSAGE_SENT':
      return {
        ...state,
        messages: state.messages.map(ms => ({ ...ms, sent: true, })),
      };
    default:
      return state;
  }
};
