import React from 'react';
import styled from 'styled-components';

const StyledButton = (props) => {
    const Button = styled.button`
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 0px;
        margin-bottom: 0px;
        padding: 4px 8px;
        min-width: 64px;
        line-height: 1.75;
        font-weight: 500;
        text-transform: uppercase;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        border: ${props => (props.hideBorder) ? '0' : '1px solid #cacaca' };
        border-radius: 4px;
        position: relative;
        user-select: none;
        vertical-align: middle;
        display: inline-flex;
        outline: none;
        align-items: center;
        background-color: transparent;
        cursor: pointer;
        color: #4caf50;
        font-family: 'Roboto';
        letter-spacing: 0.02857em;

        position: ${props => (props.right) ? 'absolute' : 'relative' };
        right: ${props => (props.right) ? '0' : 'auto' };

        &:hover {
            background-color: rgba(76, 175, 80, 0.2);
            text-decoration:none;
        }
    `;

    const spacer = {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        position: 'absolute',
        overflow: 'hidden',
        borderRadius: 'inherit',
        pointerEvents: 'none',
    };

    const content = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <Button 
            type={props.type} 
            onClick={props.onClick} 
            disabled={props.disabled} 
            style={props.style}
            right={props.right}
            hideBorder={props.hideBorder}
        >
            <span style={content}>
                {props.text}
                {(props.children) && props.children}
            </span>
            <span style={spacer}></span>
        </Button>
    );
}

export default StyledButton;