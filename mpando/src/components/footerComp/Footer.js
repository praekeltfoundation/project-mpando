import React from 'react';
import footerLogo from './assets/images/ndoh-logo.png';
import './assets/Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer--inner">
        <div className="Menu">
          <ul className="Menu-list">
            <li className="Menu-list__item"><a href="/" className="Menu-list__anchor">Terms & Conditions</a></li>
            <li className="Menu-list__item"><a href="/" className="Menu-list__anchor">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="Logo">
          <img className="Logo__image" alt="National Department of Health SA" src={footerLogo}/>
        </div>
      </div>
    </div>
  );
}

export default Footer;
