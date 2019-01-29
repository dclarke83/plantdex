import React, { Component } from 'react';
import styled from 'styled-components';

class AppHeader extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.onToggleFilters}>Toggle Filters</button>
            </div>
        );
    }
}

export default AppHeader;