import React from 'react';
import ReactDOM from 'react-dom';

import { Synth } from './components';
import registerServiceWorker from './registerServiceWorker';
import './styles/app.scss';

ReactDOM.render(
  <div className="App">
    <Synth />
  </div>,
  document.getElementById('root')
);

registerServiceWorker();
