import React, { Component } from 'react';

import Amplify, { API } from 'aws-amplify';
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

  post = async () => {
    console.log('calling api');
    const response = await API.post('plantdexapi', '/plants', {
      body: {
        id: '1',
        name: 'hello amplify!'
      }
    });
    alert(JSON.stringify(response, null, 2));
  }
  get = async () => {
    console.log('calling api');
    const response = await API.get('plantdexapi', '/plants/object/1');
    alert(JSON.stringify(response, null, 2));
  }


  render() {
    return (
      <div className="App">

        <button onClick={this.post}>Test post</button>
        <button onClick={this.get}>Test post</button>

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
