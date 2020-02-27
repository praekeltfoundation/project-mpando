import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import clsx from 'clsx';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import Header from '../headerComp/Header';
import Nav from '../navComp/Nav';
import TextBanner from '../textBannerComp/TextBanner';
import Articles from '../articlesComp/Articles';
import Howto from '../articlesComp/Howto';
import FAQ from '../articlesComp/FAQ';
import Terms from '../footerComp/TermsAndConditions';
import Privacy from '../footerComp/PrivacyPolicy';
import Footer from '../footerComp/Footer';
import Appointment from '../appointmentComp/Appointment';

import './assets/App.css';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#fff',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

    return (
      <Router>
        <div className="Wrapper">
          <AppBar
            position="absolute"
            className={clsx(classes.appBar,
              {
                [classes.appBarShift]: open
              }
            )}
            id="Header"
          >
            <Toolbar>
              <IconButton
                color="default"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Header/>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            id="Sidebar"
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Nav/>
          </Drawer>


          <div className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
            id="Main"
          >
            <Switch>
              <Route path='/stories'>
                <Fragment>
                  <TextBanner description="Workplace support in the palm of your hands." author="By Nurseconnect"/>
                  <Articles/>
                </Fragment>
              </Route>

              <Route path='/appointment'>
                <MuiThemeProvider>
                  <Appointment/>
                </MuiThemeProvider>
              </Route>

              <Route path='/faqs'>
                <Fragment>
                  <TextBanner description="Workplace support in the palm of your hands." author="By Nurseconnect"/>
                  <FAQ/>
                </Fragment>
              </Route>

              <Route path='/terms-and-condition'>
                <Terms/>
              </Route>

              <Route path='/privacy-policy'>
                <Privacy/>
              </Route>

              <Route path='/'>
                <Fragment>
                  <TextBanner description="How to Install PWA" author="Installing the application on your mobile device allows you to easily return to the application from your mobile home screen"/>
                  <Howto/>
                </Fragment>
              </Route>
            </Switch>
            <Footer/>
          </div>
        </div>
      </Router>
    )

}

export default App;
