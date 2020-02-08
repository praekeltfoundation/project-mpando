import React from 'react';
import Search from '../searchComp/Search';
import logo from './assets/images/logo.png';
import './assets/Header.css';


function Header() {
  return (
    <header className="Header StickyOn">
      <div className="Header-list">
        <div className="Header-list__item">
          <a className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            <img src={logo} className="Logo" alt="logo" />
          </a>
        </div>
        <div className="Header-list__item Header-list__item--search">
          <Search/>
        </div>
        <div className="Header-list__item Header-list__item--subscribe">
          <a className="subscribe-btn" href="https://wa.me/27645576224?text=Hello%20there%2C%0AThank%20you%20for%20your%20message%20and%20reaching%20out.%20%0AWarm%20regards">
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
