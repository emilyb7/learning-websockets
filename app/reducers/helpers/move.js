import { move, } from './../../gameplay.js';

export default (state, { space, }) => {

  const nextIteration = move(
    space, state.currentPlayer, state.game.player, state.game.round, state.game.board
  );

  const msg = JSON.stringify({
    type: 'OPPONENT-MOVE',
    player: state.game.player,
    space: space
  });

  const openMessages = (messages, round) =>
    messages.map(ms => ms.round)
      .indexOf(round) < 0;

  const messages = openMessages(state.messages, state.game.round)
    ? state.messages.concat([ { message: msg, sent: false, round: state.game.round, }, ])
    : state.messages;

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
