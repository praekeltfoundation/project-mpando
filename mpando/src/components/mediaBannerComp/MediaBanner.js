import React from 'react';
import imageryOne from './assets/images/innovative-thoughts-1.jpg';
import './assets/MediaBanner.css';


function MediaBanner() {
  return (
    <div className="Media-banner">
      <div className="Media-banner--inner">
        <span style={{
          backgroundImage: "url(" + imageryOne + ")", 
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          display: "block",
          height: "100%",
          width: "100%"
        }} 
        alt="Nurceconnect"></span>
      </div>
    </div>
  );
}

export default MediaBanner;
