import React from 'react';
import { NavLink } from 'react-router-dom';
import './assets/Nav.css';

function Nav() {

  return (
    <div className="Navigation">
      <nav>
        <ul className="Nav-list">
          <li className="Nav-list__item">
            <NavLink
              exact
              to="/"
              className="Nav-list__link"
              activeClassName="Nav-list__active">
                Home
            </NavLink>
          </li>
          <li className="Nav-list__item">
            <NavLink
              to="/articles"
              className="Nav-list__link"
              activeClassName="Nav-list__active">
                Stories
            </NavLink>
          </li>
          <li className="Nav-list__item">
            <NavLink
              to="/appointment"
              className="Nav-list__link"
              activeClassName="Nav-list__active">
                Appointment
                <span className="Nav-list__link--subtext"></span>
            </NavLink>
          </li>
          <li className="Nav-list__item">
            <NavLink
              to="/faqs"
              className="Nav-list__link"
              activeClassName="Nav-list__active">
                FAQs
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
