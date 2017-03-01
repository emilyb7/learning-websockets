/* modules */
import React from 'react';
import ReactDOM from 'react-dom';

/* components */
import App from './components/app.js';

/* redux stuff*/
import Store from './reducers/index.js';
import { createStore } from 'redux';
const store = createStore(Store);

const render = () => ReactDOM.render(<App store={store}/>, document.getElementById('root'));

render();

store.subscribe(render);
