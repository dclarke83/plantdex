import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { toggleFilters, setSearch } from './redux/actions';

class AppHeader extends Component {

    handleToggleFilters = () => {
        this.props.toggleFilters();
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
                        <DebounceInput type='text' name='search' id='search' 
                        debounceTimeout={300} value={this.props.search} onChange={e => this.handleSearch(e)} />
                    </div>
                </div>            
                <div>
                    <button onClick={this.handleToggleFilters}>Toggle Filters</button>
                </div>
            </div>
        );
    }
}

export default connect()(AppHeader);