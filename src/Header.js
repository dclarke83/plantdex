import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFilters } from './redux/actions';

class AppHeader extends Component {

    handleToggleFilters = () => {
        this.props.toggleFilters();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleToggleFilters}>Toggle Filters</button>
            </div>
        );
    }
}

export default connect(
    null,
    { toggleFilters }
) (AppHeader);