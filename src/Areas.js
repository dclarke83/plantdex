import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getPlantsByArea } from './redux/selectors';
import Plant from './Plant';
import Expander from './Expander';

const AreaListContainer = styled.div`
    padding: 16px;
    margin-bottom: 64px;
`;

const StyledPlantList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1 1;
    padding-inline-start: 0;
    padding-inline-end: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-top: 12px;
`;

class Areas extends Component {

    render() {
        return (
            <AreaListContainer>
                {this.props.areas.map((area, i) => 
                    <Expander 
                        key={ area.id } 
                        title={ area.name + ' (' + area.plants.length + ')' }
                        first={ i === 0 }
                        last={ i === this.props.areas.length-1 }
                    >
                        <StyledPlantList>
                            {area.plants.map(plant =>
                                <Plant key={plant.id} id={plant.id} plant={plant} />
                            )}
                        </StyledPlantList>
                    </Expander>
                )}
            </AreaListContainer>
        );
    }
}

const mapPropsToState = (state) => {
    return getPlantsByArea(state);
}

export default connect(mapPropsToState)(Areas);