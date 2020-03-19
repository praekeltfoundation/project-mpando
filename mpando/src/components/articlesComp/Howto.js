import React from 'react';
import Divider from '@material-ui/core/Divider';
import './assets/Howto.css';
import imageryOne from './assets/images/nc-prototype-install.jpg';

function Howto() {
  return (
    <div className="Howto-guide">
      <div className="Howto-guide__item">
        <div className="Howto-guide__images">
          <img className="Howto-guide__thumbnail"
            alt='Popup'
            src={imageryOne}
            width='430px'
            height='auto'
          />
        </div>
        <div className="Howto-guide__instructions">
          <h3>Browser pop up</h3>
          <p>When you visiting the webapp for the first time, the pop up install call to action is shown on the app.</p>
          <p>Press "Add" call to action in order to install the app to your homescreen.</p>
        </div>
      </div>
      <Divider/>
    </div>
  );
}

export default Howto;
