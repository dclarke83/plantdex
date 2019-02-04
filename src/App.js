import React, { Component } from 'react';

import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import './App.css';
import AppHeader from './Header';
import Filters from './Filters';
import FilterStatus from './FilterStatus';
import PlantList from './PlantList';
import NewPlant from './NewPlant';

Amplify.configure(awsmobile);

class App extends Component {
  render() {
    return (
      <div className="App">
        <NewPlant></NewPlant>
        <AppHeader></AppHeader>
        <Filters></Filters>
        <FilterStatus></FilterStatus>
        <PlantList />
      </div>
    );
  }
}

export default withAuthenticator(App, true);
