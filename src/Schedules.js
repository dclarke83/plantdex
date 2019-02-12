import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDistinctSchedules } from './redux/selectors';

class Schedules extends Component {

    render() {
        return (
            <div>
                    {this.props.schedules.map(schedule => (
                        <div key={schedule.monthValue}>
                            {schedule.monthLabel}
                        </div>
                    ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return getDistinctSchedules(state);
}

export default connect(mapStateToProps)(Schedules);