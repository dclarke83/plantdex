import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';

import { fetchPlants, setSearch } from './redux/actions';
import { getPlantsState, getSearchedPlants } from './redux/selectors';

import Plant from './Plant';

const StyledPlantList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1 1;
`;

class PlantList extends Component {
    componentDidMount() {
        this.props.dispatch(fetchPlants());
    }

    handleSearch = (e) => {
        const searchValue = e.target.value;
        this.props.dispatch(setSearch(searchValue));
    }

    render() {
        return (
            <div>
                <div>
                    <div>Search</div>
                    <div>
                        <DebounceInput type='text' name='search' id='search' debounceTimeout={300} value={this.props.search} onChange={e => this.handleSearch(e)} />
                    </div>
                </div>
                {this.props.loading && 
                    <div>Loading</div>
                }
                <div>
                    <StyledPlantList>
                        {this.props.currentResults.map((plant) => (
                            <Plant key={plant.id} plant={plant} />
                        ))}
                    </StyledPlantList>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...getPlantsState(state),
        currentResults: getSearchedPlants(state)
    }
}

export default connect(mapStateToProps)(PlantList);