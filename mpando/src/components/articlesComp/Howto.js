import React from 'react';
import './assets/Howto.css';
import imageryOne from './assets/images/image-one.png';

function Howto() {
  return (
    <div className="Howto-guide">
      <div className="Howto-guide__item">
        <div className="Howto-guide__images">
          <img className="Howto-guide__thumbnail"
            alt='Popup'
            src={imageryOne}
            width='430px'
            height='auto'
          />
        </div>
        <div className="Howto-guide__instructions">
          <h3>Browser pop up</h3>
          <p>When you visiting the webapp for the first time, the pop up install call to action is shown on the app.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Maecenas sed enim ut sem. Dolor sit amet consectetur adipiscing
              elit duis tristique sollicitudin. Dui vivamus arcu felis bibendum.
              Elit ut aliquam purus sit amet luctus. Ultricies leo integer malesuada nunc vel.
              Felis bibendum ut tristique et egestas quis. Eu tincidunt tortor aliquam nulla
              facilisi cras fermentum odio eu. Urna cursus eget nunc scelerisque.
              Arcu non sodales neque sodales ut etiam. Tristique risus nec feugiat in fermentum.
              Sed turpis tincidunt id aliquet risus. Ullamcorper morbi tincidunt ornare massa eget
              egestas purus. Ipsum a arcu cursus vitae. </p>
        </div>
      </div>
      <hr/>
      
      <div className="Howto-guide__item">
        <div className="Howto-guide__instructions">
          <h3>Browser pop up</h3>
          <p>When you visiting the webapp for the first time, the pop up install call to action is shown on the app.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Maecenas sed enim ut sem. Dolor sit amet consectetur adipiscing
              elit duis tristique sollicitudin. Dui vivamus arcu felis bibendum.</p>
        </div>
        <div className="Howto-guide__images">
          <img className="Howto-guide__thumbnail"
            alt='Popup'
            src={imageryOne}
            width='430px'
            height='auto'
          />
        </div>
      </div>
      <hr/>

      <div className="Howto-guide__item">
        <div className="Howto-guide__images">
          <img className="Howto-guide__thumbnail"
            alt='Popup'
            src={imageryOne}
            width='430px'
            height='auto'
          />
        </div>
        <div className="Howto-guide__instructions">
          <h3>Browser pop up</h3>
          <p>When you visiting the webapp for the first time, the pop up install call to action is shown on the app.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Maecenas sed enim ut sem. Dolor sit amet consectetur adipiscing
              elit duis tristique sollicitudin. Dui vivamus arcu felis bibendum.</p>
        </div>
      </div>
    </div>
  );
}

export default Howto;
