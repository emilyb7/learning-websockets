export const actionNewPlayer = (playerId, message) => ({
  type: 'NEW_PLAYERS',
  playerId: playerId,
  message: message
});

export const messageSent = () => ({
  type: 'MESSAGE_SENT',
});

export const actionOpponentMove = (player, space) => ({
  type: 'OPPONENT-MOVE',
  player: player,
  space: space,
});

export const actionNewMessage = (message) => ({
  type: 'NEW_MESSAGE',
  message: message,
});
