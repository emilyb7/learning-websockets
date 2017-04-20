import React from 'react';

/* containers */
import Game from './containers/game.jsx';
import SocketManager from './containers/socket-manager.jsx';

const App = () => {

  return (
    <div>
      <Game />
      <SocketManager />
    </div>
  );
};

export default App;
