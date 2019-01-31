import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchPlants } from './redux/actions';
import { getPlantsState, getFilteredPlants } from './redux/selectors';

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

    render() {
        return (
            <div>

                {this.props.loading && 
                    <div>Loading</div>
                }
                {!this.props.loading &&
                    <div>
                        <StyledPlantList>
                            {this.props.currentResults.map((plant) => (
                                <Plant key={plant.id} plant={plant} />
                            ))}
                        </StyledPlantList>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...getPlantsState(state),
        currentResults: getFilteredPlants(state),    
    }
}

export default connect(mapStateToProps)(PlantList);