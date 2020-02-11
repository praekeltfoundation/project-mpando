import React from 'react';
import './assets/Howto.css';

function Howto() {
  return (
    <div className="Howto-guide">
      <div className="Howto-guide__item">
        <div className="Howto-guide__images">
          <img className="Howto-guide__thumbnail"
            alt='Popup'
            src='./assets/images/image-one.png'
            width='230px'
            height='auto'
          />
        </div>
        <div className="Howto-guide__instructions">
          <p>-</p>
        </div>
      </div>
    </div>
  );
}

export default Howto;
