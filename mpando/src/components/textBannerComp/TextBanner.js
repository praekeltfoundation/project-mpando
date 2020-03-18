import React from 'react';
import './assets/TextBanner.css';


function Banner(props) {
  return (
    <div className="Banner">
      <div className="Banner--inner">
        <h1 className="Banner__title">{props.description}</h1>
        <p className="Banner__author">{props.author}</p>
      </div>
    </div>
  );
}

export default Banner;
