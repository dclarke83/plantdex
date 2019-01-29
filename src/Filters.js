import React, { Component } from 'react';
import styled from 'styled-components';

const SideBar = styled.div`
    position: absolute;
    top: 0px;
    z-index: 10;
    right: ${props => props.filtersVisible ? '0px' : '-270px' };
    transition: all 0.8s ease-in-out;
    float: right;
    height: 100%;
    width: 270px;
    background-color: #66bb6a;
    display: ${props => props.filtersVisible ? 'block' : 'none' };
`;

class Filters extends Component {
    constructor(props){
        super(props);
        this.state = {
            filters: {},
            error: null
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/filters')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        filters: result[0]
                    });
                },
                (error) => {
                    this.setState({
                        error,
                        filters: {}
                    });
                }
            ) 
    }

    render() {
        return (
            <div>
                <SideBar>
                  {this.props.filtersVisible && (
                    <div>
                      {Object.keys(this.state.filters).map((key) => (
                          <div key={key}>
                              <div>{key.toUpperCase()}</div>
                              <div>
                                  <select>
                                      {this.state.filters[key].map((option) => (
                                          <option key={key + ' ' + option.key} value={option.key}>{option.value}</option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                      ))}       
                    </div>             
                  )}
                </SideBar>
            </div>
        );
    }

}

export default Filters;