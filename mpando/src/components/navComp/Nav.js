import React from 'react';
import { Link } from 'react-router-dom';
import './assets/Nav.css';

function Nav() {
  return (
    <div className="Navigation">
      <nav>
        <ul className="Nav-list">
          <li className="Nav-list__item">
            <Link to="/" className="Nav-list__link">Home</Link>
          </li>
          <li className="Nav-list__item">
            <Link to="/appointment" className="Nav-list__link">Appointment
              <span className="Nav-list__link--subtext"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
