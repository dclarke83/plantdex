import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { FaHome, FaCalendarAlt, FaMapSigns, FaSignOutAlt } from 'react-icons/fa';

const NavContainer = styled.div`
    height: 56px;
    display: flex;
    justify-content: center;
    background-color: #cacaca;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
`;

const NavButton = styled(NavLink)`
    color: #66bb6a;
    flex-grow: 1;
    padding: 10px 12px 6px;
    min-width: 80px;
    max-width: 168px;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,padding-top 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    border: 0;
    margin: 0;
    cursor: pointer;
    display: inline-flex;
    outline: none;
    position: relative;
    align-items: center;
    user-select: none;
    border-radius: 0;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: transparent;
    text-align: center;

    font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
    font-size: 14px;
    font-weight: 300;
`;

const NavLinkContent = styled.span`
    width: 100%;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const ActiveStyle = {
    color: '#fff'
}

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.signOut = this.signOut.bind(this);
    }

    signOut(){
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
          
    render() {
        return (
            <NavContainer>                  
                <NavButton exact to='/' activeStyle={ActiveStyle}>
                    <NavLinkContent>
                        <FaHome size='1.5em'/>
                        <span>
                            Home
                        </span>
                    </NavLinkContent>
                </NavButton>

                <NavButton exact to='/areas' activeStyle={ActiveStyle}>
                    <NavLinkContent>
                        <FaMapSigns size='1.5em'/>
                        <span>
                            Areas
                        </span>
                    </NavLinkContent>
                </NavButton>

                <NavButton exact to='/schedules' activeStyle={ActiveStyle}>
                    <NavLinkContent>
                        <FaCalendarAlt size='1.5em'/>
                        <span>
                            Schedules
                        </span>
                    </NavLinkContent>
                </NavButton>                

                <NavButton as='button' onClick={this.signOut}>
                    <NavLinkContent>
                        <FaSignOutAlt size='1.5em'/>
                        <span>
                            Signout
                        </span>
                    </NavLinkContent>
                </NavButton> 
            </NavContainer>
        );
    }
}

export default Navigation;