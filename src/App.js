import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import './App.css';
import AppHeader from './Header';
import Filters from './Filters';
import FilterStatus from './FilterStatus';
import PlantList from './PlantList';
import NewPlant from './NewPlant';
import Areas from './Areas';
import Navigation from './Navigation';
import Schedules from './Schedules';

import { Snackbar } from 'react-redux-snackbar';

Amplify.configure(awsmobile);

const AppContainer = {
  paddingTop: '66px'
}

const snackStyles = {
  snack: {
    zIndex: 10000
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation></Navigation>
            <div style={AppContainer}>
              <FilterStatus></FilterStatus>
              <Route exact path='/' render={() => <PlantList /> } />
              <Route exact path="/areas" render={() => <Areas />} />
              <Route exact path="/schedules" render={() => <Schedules />} />
            </div>
          </div>
        </Router>

        <NewPlant></NewPlant>
        <AppHeader></AppHeader>
        <Filters></Filters>
        <Snackbar customStyles={snackStyles}/>
      </div>
    );
  }
}

export default withAuthenticator(App, false);
