import React from 'react';
import './assets/Articles.css';

function FAQ() {
  return (
    <div className="Usage-guide">
      <div className="Usage-guide--inner">
      <img class="alignright" src="https://bettercare.co.za/wp-content/uploads/2015/04/ls-screenshot-ipad-mini-galaxy-y-300x297.png" alt="Bettercare Learning Station on iPad Mini and Samsung Galaxy Y" scale="0" width="157" height="155"/>
      <h2 class="Usage-guide__subheading">Click here to go to the Learning Station</h2>
      <h5 class="Usage-guide__strong">Read all of our learning programmes online for free!</h5>
      <ul>
        <li>Learn and test your knowledge on your smartphone, tablet or computer.</li>
        <li>Interactive chapter quizzes show your learning. Just register with your email or cell number.</li>
        <li>Formal examination: speak to your institution about co-ordinating a learning group and a setting up an examination.</li>
        <li>Certificates are awarded when students complete the formal examination and achieve a mark of 80% and above. The certificates are digital and sent via email to the facilitator.</li>
      </ul>
      </div>
    </div>
  );
}

export default FAQ;
