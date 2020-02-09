import React from 'react';
import ReactDOM from 'react-dom';
import './Variables.css';
import './Index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/appComp/App';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
