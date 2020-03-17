import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/appComp/App';

class Index extends Component {
  render() {
    return (
      <div className="Container">
        <div id="app-update" className="hidden">
          <p className="connectivity">Online</p>
        </div>
        <div id="app-banner"></div>
        <App />
      </div>
    )
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));
serviceWorker.register();
