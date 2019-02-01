import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getFilterStatus } from './redux/selectors';

const FilterContainer = styled.div`
    margin: 5px;
`;

const FilterItem = styled.span`

`;

const FilterItemContent = styled.span`
    border: #cacaca solid 1px;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 4px;
`;

const FilterItemName = styled.span`

`;

const FilterOption = styled.span`
    margin-left: 2px;
    margin-right: 2px;
`;

class FilterStatus extends Component {
    render() {
        return (
            <FilterContainer>
            {
                this.props.filters && this.props.filters.map((filterItem, itemIndex) => (
                    <FilterItem key={filterItem.filter}>
                        <FilterItemContent>
                            <FilterItemName>{filterItem.filter}</FilterItemName>
                            <span> =</span>
                            {filterItem.values.map((option, optionIndex) => (
                                <FilterOption key={option}>
                                    <span>{option}</span>
                                    {
                                        optionIndex < filterItem.values.length-1 &&
                                        <span>&nbsp;OR</span>
                                    }
                                </FilterOption>
                            ))}
                        </FilterItemContent>
                        {
                            itemIndex < this.props.filters.length-1 &&
                            <span>&nbsp;AND&nbsp;</span>
                        }
                    </FilterItem>
                ))
            }
            </FilterContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: getFilterStatus(state)
    };
}

export default connect(mapStateToProps)(FilterStatus);