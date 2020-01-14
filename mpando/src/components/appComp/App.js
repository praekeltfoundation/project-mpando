import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/App.css';

import Header from '../headerComp/Header';
import Nav from '../navComp/Nav';
import TextBanner from '../textBannerComp/TextBanner';
import Articles from '../articlesComp/Articles';
import Footer from '../footerComp/Footer';

import Appointment from '../appointmentComp/Appointment';

class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
          <Switch>
            <Route path='/appointment'>
              <Appointment/>
            </Route>
            <Route path='/'>
              <Fragment>
                <Nav/>
                <TextBanner/>
                <Articles/>
              </Fragment>
            </Route>
          </Switch>
          <Footer/>
      </Router>
    )
  }
}

export default App;
