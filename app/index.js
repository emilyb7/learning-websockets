import React from 'react';
import { render } from 'react-dom';

import App from './components/app.js';

// import store from './app/reducers/index.js';
//import { createStore } from 'redux';
//const store = createStore(Store);

render(
  <App />,
  document.getElementById('root'),
)

// store.subscribe(render);
