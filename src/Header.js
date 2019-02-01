import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';
import { toggleFilters, setSearch, openNewPlant } from './redux/actions';

const Header = styled.header`
    top: auto;
    bottom: 0;
    background-color: #4caf50;
    left: auto;
    right: 0;
    position: fixed;
    width: 100%;
    display: flex;
    z-index: 1000;
    box-sizing: border-box;
    flex-shrink: 0;
    flex-direction: column;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
`;

const HeaderContent = styled.div`
    align-items: center;
    justify-content: space-between;
    min-height: 64px;
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    position: relative;
`;

const MenuButton = styled.button`
    flex: 0 0 auto;
    padding: 4px 8px;
    min-width: 64px;
    line-height: 1.75;
    font-weight: 500;
    text-transform: uppercase;
    border: 1px;
    overflow: visible;
    font-size: 1.25em;
    text-align: center;
    border-radius: 3px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border: 0;
    margin: 0;
    cursor: pointer;
    display: inline-flex;
    outline: none;
    position: relative;
    align-items: center;
    user-select: none;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.15);

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`;

const RoundButton = styled.button`
    top: -30px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 1;
    position: absolute;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: inline-flex;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    background-color: #81c784;
    outline: none;
    padding-top: 4px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
    border: 0;
    cursor: pointer;
    user-select: none;
    font-weight: 500;
    font-size: 30px;

    &:hover {
        background-color: rgb(90, 139, 92);
    }
`;

const searchStyle = {
    padding: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: 0,
    borderRadius: '4px',
    minWidth: '210px',
}

class AppHeader extends Component {

    handleToggleFilters = () => {
        this.props.dispatch(toggleFilters());
    }

    handleSearch = (e) => {
        const searchValue = e.target.value;
        this.props.dispatch(setSearch(searchValue));
    }

    handleNewPlant = () => {
        this.props.dispatch(openNewPlant());
    }

    render() {
        return (
            <Header>
                <HeaderContent>
                    <div>
                        <DebounceInput type='text' name='search' id='search' 
                        placeholder='Search' style={searchStyle}
                        debounceTimeout={300} value={this.props.search} onChange={e => this.handleSearch(e)} />
                    </div>                     
                    <RoundButton onClick={this.handleNewPlant}>
                        +
                    </RoundButton>
                    <MenuButton onClick={this.handleToggleFilters}>
                        Filter
                    </MenuButton>           
                </HeaderContent>
            </Header>
        );
    }
}

export default connect()(AppHeader);