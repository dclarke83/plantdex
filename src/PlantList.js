import React, { Component } from 'react';
import Plant from './Plant';
class PlantList extends Component {

    state = {
        loading: true,
        error: null,
        plants: []
    };

    componentDidMount() {
        fetch('http://localhost:8080/plants')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        plants: result,
                        loading: false
                    });
                },
                (error) => {
                    this.setState({
                        error,
                        loading: false,
                        plants: []
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.plants.map((plant) => (
                        <Plant key={plant.id} plant={plant} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default PlantList;