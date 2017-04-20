export const actionNewPlayer = playerId => ({
  type: 'NEW_PLAYERS',
  playerId: playerId,
});

export const messageSent = () => ({
  type: 'MESSAGE_SENT',
});

export const actionOpponentMove = (player, space) => ({
  type: 'OPPONENT-MOVE',
  player: player,
  space: space,
});
