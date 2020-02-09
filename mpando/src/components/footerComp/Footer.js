import React from 'react';
import { NavLink } from 'react-router-dom';
import footerLogo from './assets/images/ndoh-logo.png';
import './assets/Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer--inner">
        <div className="Menu">
          <ul className="Menu-list">
          <li className="Menu-list__item">
            <NavLink
              exact
              to="/"
              className="Menu-list__anchor"
              activeClassName="Menu-list__active">
                Home
            </NavLink>
          </li>
          <li className="Menu-list__item">
            <NavLink
              to="/terms-and-condition"
              className="Menu-list__anchor"
              activeClassName="Menu-list__active">
                Terms & Conditions
            </NavLink>
          </li>
          <li className="Menu-list__item">
            <NavLink
              to="/privacy-policy"
              className="Menu-list__anchor"
              activeClassName="Menu-list__active">
                Privacy Policy
            </NavLink>
          </li>
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
