import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getFiltersState } from './redux/selectors';
import { fetchFilters, updateFilter, setLoading, clearFilters } from './redux/actions';

const SideBar = styled.div`
    position: fixed;
    top: 0px;
    z-index: 10;
    right: -270px;
    transition: transform 0.25s ease-in-out;
    float: right;
    height: calc(100% - 64px);
    width: 270px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12);    
    transform: translateX(${props => props.show ? '-270px' : '0px' });
`;

const SideBarContent = styled.div`
    padding:10px;
`;

const FilterElement = styled.div`
    margin-bottom: 15px;
`;

// Returns a new object with properties for each of
// the filter names in the source array - for use
// in setting up the internal state for react-select
const setupFilterState = (filters) => {
    return filters.reduce((acc, cur) => {
        acc[cur.name] = null;
        return acc; 
    }, {});
}

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: null
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchFilters());
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // Conditionally calls setupFilterState to create the dynamic
        // filter properties on the internal state, for use as values
        // for the dynamically created react-select controls
        if(prevState.filters === null && nextProps.filters.length > 0) {
            return {
                 filters: setupFilterState(nextProps.filters)
            };
        } else {
            return prevState;
        }
    }

    handleChange = filter => selectedOptions => {
        // Annoying code to enable react-select to store selected values
        const filters = { [filter]: selectedOptions };
        const newFilters = Object.assign({}, this.state.filters, filters);
        this.setState({
            filters: newFilters
        });

        // Proper Redux state management
        this.props.dispatch(setLoading(true));
        this.props.dispatch(updateFilter(filter, selectedOptions.map((option) => ( option.value ))));
        this.props.dispatch(setLoading(false));
    }

    handleClear = () => {
        // This is purely for react-select to appear to have nothing selected
        this.setState({
            filters: setupFilterState(this.props.filters)
        });

        // This does the actual work
        this.props.dispatch(clearFilters());
    }

    // Takes the filter options (value and label)
    // and adds a filter name property for use later
    getOptions(filter){
        return filter.options.map((option) => (
            {
                ...option,
                filterName: filter.name
            }
        ));
    }

    render() {
        return (
            <div>
                <SideBar show={this.props.filtersVisible}>
                    <SideBarContent>
                        <h1>Filters</h1>
                        {this.props.filters.map((filter) => (
                            <FilterElement key={filter.name}>
                                <div>{filter.name.toUpperCase()}</div>
                                <div>
                                    <Select
                                        key={filter.name}
                                        name={filter.name}
                                        value={this.state.filters[filter.name]}
                                        isClearable={true}
                                        isMulti={true}
                                        onChange={this.handleChange(filter.name)}
                                        options={this.getOptions(filter)}
                                    />
                                </div>
                            </FilterElement>
                        ))}  
                        <button onClick={this.handleClear}>Clear</button>     
                    </SideBarContent>             
                </SideBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return getFiltersState(state);
}

export default connect(mapStateToProps)(Filters);
