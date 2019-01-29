import React, { Component } from 'react';
import './App.css';
import Filters from './Filters';
import PlantList from './PlantList';

class App extends Component {
  constructor(props){
    super(props);
  }



  render() {
    return (
      <div className="App">
        <Filters />
        <PlantList />
      </div>
    );
  }
}

export default App;
