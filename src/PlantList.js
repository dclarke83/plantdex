import React, { Component } from 'react';
import styled from 'styled-components';
import Plant from './Plant';

const StyledPlantList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1 1;
`;

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
                {this.state.loading && 
                    <div>Loading</div>
                }
                <div>
                    <StyledPlantList>
                        {this.state.plants.map((plant) => (
                            <Plant key={plant.id} plant={plant} />
                        ))}
                    </StyledPlantList>
                </div>
            </div>
        );
    }
}

export default PlantList;