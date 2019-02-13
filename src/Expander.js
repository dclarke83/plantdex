import React, { Component } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Panel = styled.div`
    background-color: #fff;
    width: 100%;
    margin-left: 0;
    margin-right: 0;

    height: ${props => (props.expanded) ? 'auto' : '48px' };
    margin-top: ${props => (props.expanded && !props.first) ? '16px' : '0' };
    margin-bottom: ${props => (props.expanded && !props.last) ? '16px' : '0' };

    box-shadow: 0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
    border-bottom: 1px solid #e0e0e0;
    position: relative;
    transition: all .3s;
`;

const Bar = styled.div`
    height: 48px;
    width: 100%;
    cursor: pointer;
`;

const Buttons = styled.div`
    height: 32px;
    padding: 16px 24px 0 0;
    float: right;
    color: #9e9e9e;
`;

const Title = styled.div`
    float: left;
    height: 24px;
    padding: 12px 0 0 24px;

    .text {
        height: 20px;
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        padding-top: 2px;
    }
`;

const Content = styled.div`
    padding-top: 8px;
    background-color: #eee;
    display: ${props => (props.expanded) ? 'block' : 'none' };
    transition: all .3s;
`;

class Expander extends Component {
    constructor(props){
        super(props);

        this.state = {
            expanded: false
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(){
        this.setState({ expanded: !this.state.expanded })
    }

    render(){
        return (
            <Panel expanded={this.state.expanded} first={this.props.first} last={this.props.last}>
                <Bar onClick={this.handleToggle}>
                    <Title>
                        <span className='text'>
                            {this.props.title}
                        </span>
                    </Title>
                    <Buttons>
                        {(this.state.expanded) ? <FaChevronUp/> : <FaChevronDown/>}
                    </Buttons>                
                </Bar>
                <Content expanded={this.state.expanded}>
                    {this.props.children}
                </Content>
            </Panel>
        );
    }
}

export default Expander;