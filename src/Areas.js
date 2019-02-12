import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getPlantsByArea } from './redux/selectors';
import Plant from './Plant';

const AreaListContainer = styled.ul`
    margin-bottom: 64px;
    list-style-type: none;
    padding-inline-start: 0;
    padding-inline-end: 0;
`;

const Area = styled.div`
    margin-left: 5px;
    margin-right: 10px;
    margin-bottom: 20px;

    h1 {
        background-color: #ff9900;
        color: #fff;
        padding: 8px;
        /* border-radius: 6px; */
        font-size: 1.5em;
    }
`;

const StyledPlantList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1 1;
    padding-inline-start: 0;
    padding-inline-end: 0;
`;

class Areas extends Component {

    render() {
        return (
            <AreaListContainer>
                {this.props.areas.map(area => 
                        <li key={area.id}>
                            {area.plants.length > 0 &&
                            <div>
                                <Area>
                                    <h1>
                                        {area.name} <span>({area.plants.length})</span>
                                    </h1>
                                </Area>

                                <StyledPlantList>
                                    {area.plants.map(plant =>
                                        <Plant key={plant.id} id={plant.id} plant={plant}/>
                                    )}
                                </StyledPlantList>
                            </div>
                            }
                        </li>
                )}
            </AreaListContainer>
        );
    }
}

const mapPropsToState = (state) => {
    return getPlantsByArea(state);
}

export default connect(mapPropsToState)(Areas);