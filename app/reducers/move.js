import { move } from './../gameplay.js';

export default (state, action) => {
  const nextIteration = move(action.space, state.currentPlayer, state.game.player, state.game.round, state.game.board);
  const msg = JSON.stringify({
    type: 'OPPONENT-MOVE',
    player: state.game.player,
    space: action.space
  });

  let messages = state.messages;

  if (state.messages.map(msg => msg.round).indexOf(state.game.round) < 0) {
    messages = state.messages.concat([{ message: msg, sent: false, round: state.game.round, }]);
  }

  return nextIteration.success === false
  ? state
  : Object.assign({}, state, {
    game: {
      board: nextIteration.board,
      player: nextIteration.player,
      round: nextIteration.round,
      win: nextIteration.win,
    },
    messages: messages,
  });
}
