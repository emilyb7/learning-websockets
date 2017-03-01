const defaultState = {
  players: [],
  game: {},
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'MOVE':
      // return something;
    default:
      return state;
  }
};
