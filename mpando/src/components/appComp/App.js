import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/App.css';

import Header from '../headerComp/Header';
import Nav from '../navComp/Nav';
import TextBanner from '../textBannerComp/TextBanner';
import Articles from '../articlesComp/Articles';
import FAQ from '../articlesComp/FAQ';

import Terms from '../footerComp/TermsAndConditions';
import Privacy from '../footerComp/PrivacyPolicy';
import Footer from '../footerComp/Footer';

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Appointment from '../appointmentComp/Appointment';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="Wrapper">
          <div className="Sidebar">
            <Nav/>
          </div>
          <div className="Main">
            <Header/>
            <Switch>
              <Route path='/appointment'>
                <MuiThemeProvider>
                  <Appointment/>
                </MuiThemeProvider>
              </Route>
              <Route path='/faqs'>
                <Fragment>
                  <TextBanner/>
                  <FAQ/>
                </Fragment>
              </Route>
              <Route path='/terms-and-condition'>
                <Fragment>
                  <Terms/>
                </Fragment>
              </Route>
              <Route path='/privacy-policy'>
                <Fragment>
                  <Privacy/>
                </Fragment>
              </Route>
              <Route path='/'>
                <Fragment>
                  <TextBanner/>
                  <Articles/>
                </Fragment>
              </Route>
            </Switch>
            <Footer/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
