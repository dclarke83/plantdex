import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchPlants } from './redux/actions';
import { getPlantsState, getSearchedFilteredFormattedPlants } from './redux/selectors';

import Plant from './Plant';
import Spinner from './Spinner';

const StyledPlantList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1 1;
    padding-inline-start: 0;
    padding-inline-end: 0;
`;

const PlantListContainer = styled.div`
    margin-bottom: 64px;
`;

class PlantList extends Component {
    componentDidMount() {
        this.props.dispatch(fetchPlants());
    }

    render() {
        return (
            <PlantListContainer>
                <Spinner loading={this.props.loading}></Spinner>
                {!this.props.loading &&
                    <div>
                        <StyledPlantList>
                            {this.props.currentResults.map((plant) => (
                                <Plant key={plant.id} plant={plant} />
                            ))}
                        </StyledPlantList>
                    </div>
                }
            </PlantListContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...getPlantsState(state),
        currentResults: getSearchedFilteredFormattedPlants(state),    
    }
}

export default connect(mapStateToProps)(PlantList);