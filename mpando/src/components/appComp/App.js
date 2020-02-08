import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/App.css';

import Header from '../headerComp/Header';
import Nav from '../navComp/Nav';
import TextBanner from '../textBannerComp/TextBanner';
import Articles from '../articlesComp/Articles';
import Results from '../resultsSearchComp/Results';
import Footer from '../footerComp/Footer';

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Appointment from '../appointmentComp/Appointment';
class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
        <Switch>
          <Route path='/results'>
            <Fragment>
              <Nav/>
              <TextBanner/>
          
            </Fragment>
          </Route>
          <Route path='/appointment'>
            <MuiThemeProvider>
              <Appointment/>
            </MuiThemeProvider>
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
