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
            <Switch>
              <Route path='/articles'>
                <Header/>
                <Fragment>
                  <TextBanner description="Workplace support in the palm of your hands." author="By Nurseconnect"/>
                    <Articles/>
                </Fragment>
              </Route>
              <Route path='/appointment'>
                <Header/>
                <MuiThemeProvider>
                  <Appointment/>
                </MuiThemeProvider>
              </Route>
              <Route path='/faqs'>
                <Header/>
                <Fragment>
                  <TextBanner description="Workplace support in the palm of your hands." author="By Nurseconnect"/>
                  <FAQ/>
                </Fragment>
              </Route>
              <Route path='/terms-and-condition'>
                <Header/>
                <Fragment>
                  <Terms/>
                </Fragment>
              </Route>
              <Route path='/privacy-policy'>
                <Fragment>
                  <Header/>
                  <Privacy/>
                </Fragment>
              </Route>
              <Route path='/'>
                <Fragment>
                  <TextBanner description="How to Install PWA" author="Installing the application on your mobile device allows you to easily return to the application from your mobile home screen"/>
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
