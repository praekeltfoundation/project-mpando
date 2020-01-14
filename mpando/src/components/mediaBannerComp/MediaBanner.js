import React from 'react';
import ncVideoWeb from './assets/nc.webm';
import ncVideoMP3 from './assets/nc.mp4';
import './assets/MediaBanner.css';


function MediaBanner() {
  return (
    <div className="Media-banner">
      <div className="Media-banner--inner">
        <video playsinline="" autoplay="autoplay" muted="muted" loop="loop" class="Media-banner__video">
          <source src={ncVideoWeb} type="video/webm"/>
          <source src={ncVideoMP3} type="video/mp4"/>
        </video>
      </div>
    </div>
  );
}

export default MediaBanner;
