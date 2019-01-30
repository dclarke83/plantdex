import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getFiltersState } from './redux/selectors';
import { fetchFilters } from './redux/actions';

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

    render() {
        return (
            <div>
                <SideBar show={this.props.filtersVisible}>
                    <div>
                      {Object.keys(this.props.filters).map((key) => (
                          <div key={key}>
                              <div>{key.toUpperCase()}</div>
                              <div>
                                  <select>
                                      {this.props.filters[key].map((option) => (
                                          <option key={key + ' ' + option.key} value={option.key}>{option.value}</option>
                                      ))}
                                  </select>
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
