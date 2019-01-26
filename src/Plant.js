import React, { Component } from 'react';

class Plant extends Component {

    render() {
        return (
            <li>
                <div>{this.props.plant.Name}</div>
            </li>
        );
    }
}

export default Plant;