import React, { Component } from 'react';
import config from './config';
import load from './sheet';

class PlantList extends Component {

    state = {
        loading: true,
        error: null,
        plants: []
    };

    componentDidMount() {
        window.gapi.load('client', this.initClient);
    }

    onLoad = (data, error) => {
        if (data) {
            this.setState({
                plants: data,
                loading: false,
            });
        } else {
            this.setState({ error, loading: false });
        }
    }

    initClient = () => {
        window.gapi.client
            .init({
                apiKey: config.apiKey,
                discoveryDocs: config.discoveryDocs
            })
            .then(() => {
                load(this.onLoad);
            });
    }

    render() {
        return (
            <div>
                The plant list goes here
            </div>
        );
    }
}

export default PlantList;