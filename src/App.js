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
import ErrorBoundary from './ErrorBoundary';
import Navigation from './Navigation';

Amplify.configure(awsmobile);

const AppContainer = {
  paddingTop: '66px'
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation></Navigation>
            <div style={AppContainer}>
              <FilterStatus></FilterStatus>
              <Route exact path="/" render={props => <ErrorBoundary><PlantList /></ErrorBoundary> } />
              <Route exact path="/areas" render={props => <Areas /> } />
            </div>
          </div>
        </Router>

        <NewPlant></NewPlant>
        <AppHeader></AppHeader>
        <Filters></Filters>
      </div>
    );
  }
}

export default withAuthenticator(App, false);
