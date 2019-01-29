import React, { Component } from 'react';
import './App.css';
import AppHeader from './Header';
import Filters from './Filters';
import PlantList from './PlantList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      filtersVisible: false
    };
    this.ToggleFilters = this.ToggleFilters.bind(this);
  }

  ToggleFilters(e) {
    this.setState(prevState => ({ filtersVisible: !prevState.filtersVisible }));
  }

  render() {
    return (
      <div className="App">
        <AppHeader></AppHeader>
        <Filters></Filters>
        <PlantList />
      </div>
    );
  }
}

export default App;
