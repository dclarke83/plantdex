import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getFiltersState } from './redux/selectors';
import { fetchFilters, updateFilter, setLoading } from './redux/actions';

const SideBar = styled.div`
    position: fixed;
    top: 0px;
    z-index: 10;
    right: -270px;
    transition: transform 0.8s ease-in-out;
    float: right;
    height: 100%;
    width: 270px;
    background-color: #66bb6a;
    transform: translateX(${props => props.show ? '-270px' : '0px' });
`;

class Filters extends Component {
    componentDidMount() {
        this.props.dispatch(fetchFilters());
    }

    handleChange = filter => selectedOptions => {
        this.props.dispatch(setLoading(true));
        this.props.dispatch(updateFilter(filter, selectedOptions.map((option) => ( option.value ))));
        this.props.dispatch(setLoading(false));
    }

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
                    <div>
                      {this.props.filters.map((filter) => (
                          <div key={filter.name}>
                              <div>{filter.name.toUpperCase()}</div>
                              <div>
                                  <Select
                                    key={filter.name}
                                    name={filter.name}
                                    isClearable={true}
                                    isMulti={true}
                                    onChange={this.handleChange(filter.name)}
                                    options={this.getOptions(filter)}
                                  />
                              </div>
                          </div>
                      ))}       
                    </div>             
                </SideBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return getFiltersState(state);
}

export default connect(mapStateToProps)(Filters);
