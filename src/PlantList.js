import React, { Component } from 'react';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';
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
        plants: [],
        search: '',
        currentResults: []
    };

    componentDidMount() {
        fetch('http://localhost:8080/plants')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        plants: result.map((plant) => (this.formatPlant(plant))),
                        currentResults: result.map((plant) => (this.formatPlant(plant))),
                        loading: false,
                        search: '',
                    });
                },
                (error) => {
                    this.setState({
                        error,
                        loading: false,
                        plants: [],
                        currentResults: [],
                        search: ''
                    });
                }
            )
    }

    formatPlant = (plant) => {
        const splitFields = [
            'exposure',
            'moisture',
            'soil',
            'pH',
            'sunlight'
        ];

        let newPlant = {
            ...plant
        };

        splitFields.map((field) => (
            newPlant[field + 'Arr'] = plant[field].toLowerCase().split('/')
        ))

        return newPlant;
    }


    handleSearch = (e) => {
        const searchValue = e.target.value;
        const searchResults = this.searchPlantNames(searchValue, this.state.plants.slice());

        this.setState({
           currentResults: searchResults,
           search: searchValue,
        });
    }

    searchPlantNames(string, plants) {      
        return plants.filter(plant => {
            const regex = new RegExp(string, 'gi');
            return plant.name.match(regex) || plant.commonName.match(regex);
        });
    }    

    render() {
        return (
            <div>
                <div>
                    <div>Search</div>
                    <div>
                        <DebounceInput type='text' name='search' id='search' debounceTimeout={300} value={this.state.search} onChange={e => this.handleSearch(e)} />
                    </div>
                </div>
                <div>
                    <div>Filters</div>
                </div>
                {this.state.loading && 
                    <div>Loading</div>
                }
                <div>
                    <StyledPlantList>
                        {this.state.currentResults.map((plant) => (
                            <Plant key={plant.id} plant={plant} />
                        ))}
                    </StyledPlantList>
                </div>
            </div>
        );
    }
}

export default PlantList;