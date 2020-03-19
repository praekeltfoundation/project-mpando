import React from 'react';
import logo from './assets/images/logo.png';
import './assets/Header.css';


function Header() {
  return (
    <header className="Header StickyOn">
      <div className="Header-list">
        <div className="Header-list__item">
          <a className="App-link"
            href="/"
            rel="noopener noreferrer">
            <img src={logo} className="Logo" alt="logo" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
