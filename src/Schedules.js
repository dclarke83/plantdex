import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getDistinctSchedules } from './redux/selectors';
import Plant from './Plant';
import Expander from './Expander';

const SchedulesContainer = styled.div`
    margin-bottom: 64px;
`

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

class Schedules extends Component {
    constructor(props){
        super(props);

        this.date = new Date();
        this.state = {
            currentSchedule: {
                plants: []
            },
            startIndex: this.date.getMonth(),
            currentIndex: 0,
            started: false
        };        

        this.handleSetSchedule = this.handleSetSchedule.bind(this);

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    handleSetSchedule = (schedule) => {
        this.setState({ currentSchedule: schedule });
    }

    handleNext() {
        if((this.state.currentIndex + 1) > (this.props.schedules.length - 1)){
            this.setState({currentIndex: 0 });
        } else {
            this.setState({currentIndex: this.state.currentIndex +1 });
        }
    }

    handlePrev() {
        if((this.state.currentIndex - 1) < 0){
            this.setState({currentIndex: this.props.schedules.length -1 });
        } else {
            this.setState({currentIndex: this.state.currentIndex - 1 });
        }
    }

    render() {
        return (
            <SchedulesContainer>
                <button onClick={this.handlePrev}>Prev</button>
                <button onClick={this.handleNext}>Next</button>
                <div>
                    {this.props.schedules[this.state.currentIndex].monthLabel}
                </div>
                <div>
                    <div style={{padding: '16px'}}>
                        {this.props.schedules[this.state.currentIndex].schedules.map((schedule, i) => (
                            <Expander 
                                key={schedule.name} 
                                title={schedule.name + ' (' + schedule.plants.length + ')'}
                                first={i === 0}
                                last={i === this.props.schedules.length-1}
                            >
                                <StyledPlantList>
                                    {schedule.plants.map(plant => 
                                        <Plant key={plant.id} id={plant.id} plant={plant} />
                                    )}
                                </StyledPlantList>                                
                            </Expander>
                        ))}
                    </div>
                </div>
            </SchedulesContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return getDistinctSchedules(state);
}

export default connect(mapStateToProps)(Schedules);