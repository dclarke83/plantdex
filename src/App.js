import React, { Component } from 'react';
import './App.css';
import AppHeader from './Header';
import Filters from './Filters';
import FilterStatus from './FilterStatus';
import PlantList from './PlantList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader></AppHeader>
        <Filters></Filters>
        <FilterStatus></FilterStatus>
        <PlantList />
      </div>
    );
  }
}

export default App;
