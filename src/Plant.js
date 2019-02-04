import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { openExistingPlant, deletePlant } from './redux/actions';

const Card = styled.div`
    width: 100%;
    border: 0;
    display: flex;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    margin-bottom: 30px;
    border-radius: 6px;
    flex-direction: column;
`;

const CardTitleHolder = styled.div`
    margin: 0;
    padding: 0 15px;
    min-height: 120px;
    background-image: ${props => formatBg(props.image) || null };
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #cbcbcb;
`;

const CardTitleContent = styled.div`
    display: inline-block;
    padding: 15px;
    margin-top: -20px;
    margin-right: 0;
    border-radius: 3px;
    color: #fff;
    background: linear-gradient(60deg, #66bb6a, #43a047);
    box-shadow: 0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2);
`;

const Title = styled.h1`
    color: #fff;
    margin-top: 0;
    min-height: auto;
    font-weight: 300;
    margin-bottom: 3px;
    text-decoration: none;
    font-size: 1.3em;
    line-height: 1.4em;
`;

const SubTitle = styled.h2`
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    min-height: auto;
    font-weight: 300;
    text-decoration: none;
    font-size: 0.875rem;
    line-height: 1.4em;
`;

const CardContent = styled.div`
    display: flex;
    padding: 0.9375rem 20px;
    position: relative;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;

`;

const StyledPlant = styled.li`
    flex: 1 0 375px;
    margin: 10px;
    display: flex;
    flex-direction: column;

    perspective: 1000px;
    position: relative;
    transform-style: preserve-3d;
`;

const PropertyBox = styled.div`
    flex: 1 0 auto;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;    
`;

const Property = styled.div`
    display: flex;
    flex: 1 0 auto;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
`;

const CardFooter = styled.div`
    display: flex;
    padding: 8px 4px;
    align-items: center;
    border-top: 1px solid #cacaca;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
`;

const StyledCardButton = styled.button`
    margin: 0 4px;
    padding: 4px 8px;
    min-width: 64px;
    line-height: 1.75;
    font-weight: 500;
    text-transform: uppercase;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border: 0;
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
        background-color: rgba(76, 175, 80, 0.08);
        text-decoration:none;
    }
`;

const Notes = styled.div`
    display: ${props => props.show ? 'block' : 'none' };
    margin-bottom:3px;
`;

const CardButton = (props) => {
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
        <StyledCardButton right={props.right} type='button' onClick={props.onClick}>
            <span style={content}>
                {props.text}
            </span>
            <span style={spacer}></span>
        </StyledCardButton>
    );
}


const StyledProperty = (props) => {
    return (
        <Property>
            <b>{props.name}</b>
            <span>{props.value}</span>
        </Property>
    );
}

const formatBg = (path) => {
    let output = false;
    if (path) {
        output = 'url(' + path + ')';
    }
    return output;
} 

class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
        };
        this.handleFlip = this.handleFlip.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleFlip(e) {
        this.setState(prevState => ({isFlipped: !prevState.isFlipped }));
    }

    handleEditClick(e) {
        this.props.dispatch(openExistingPlant(this.props.plant.id));
    }

    handleDelete(e) {
        this.props.dispatch(deletePlant(this.props.plant.id));
    }

    render() {
        const front = {
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            left: '0',
            visibility: this.state.isFlipped ? 'hidden' : '',
            position: this.state.isFlipped ? 'absolute' : 'relative',
            top: '0',
            transform: `rotateY(${
                this.state.isFlipped ? 180 : 0
            }deg)`,
            transformStyle: 'preserve-3d',
            width: '100%',
            zIndex: '2',
            transition: '0.6s',
        },
        back = {
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            left: '0',
            visibility: this.state.isFlipped ? '' : 'hidden',
            position: this.state.isFlipped ? 'relative' : 'absolute',
            transform: `rotateY(${
              this.state.isFlipped ? 0 : -180
            }deg)`,
            transformStyle: 'preserve-3d',
            top: '0',
            width: '100%',
            transition: '0.6s',
        };

        return (
            <StyledPlant className='styledPlant'>
                <Card style={front}>
                    <CardTitleHolder className='cardTitleHolder' image={this.props.plant.mainImage}>
                        <CardTitleContent className='cardTitleContent'>
                            <Title className='title'>{this.props.plant.name}</Title>
                            <SubTitle className='subTitle'>{this.props.plant.commonName}</SubTitle>
                        </CardTitleContent>
                    </CardTitleHolder>
                    <CardContent className='cardContent'>
                        <PropertyBox className='propertyBox'>
                            <StyledProperty name='Foliage' value={this.props.plant.foliage}></StyledProperty>
                            <StyledProperty name='Exposure' value={this.props.plant.exposure}></StyledProperty>
                            <StyledProperty name='Soil' value={this.props.plant.soil}></StyledProperty>
                            <StyledProperty name='pH' value={this.props.plant.pH}></StyledProperty>
                            <StyledProperty name='Sunlight' value={this.props.plant.sunlight}></StyledProperty>
                            <StyledProperty name='Moisture' value={this.props.plant.moisture}></StyledProperty>
                            <StyledProperty name='Hardiness' value={this.props.plant.hardiness}></StyledProperty>
                            <StyledProperty name='Purchased' value={this.props.plant.purchased}></StyledProperty>
                            <StyledProperty name='Height' value={this.props.plant.height + ' (' + this.props.plant.ageToMaxHeight + ')'}></StyledProperty>
                        </PropertyBox>
                    </CardContent>
                    <CardFooter>
                        <CardButton text='Notes' onClick={this.handleFlip}></CardButton>
                        <CardButton text='Edit' onClick={this.handleEditClick}></CardButton>
                        <CardButton right={true} onClick={this.handleDelete} text='Delete'></CardButton>
                    </CardFooter>
                </Card>
                <Card style={back}>
                <CardTitleHolder className='cardTitleHolder' image={this.props.plant.mainImage}>
                        <CardTitleContent className='cardTitleContent'>
                            <Title className='title'>{this.props.plant.name}</Title>
                            <SubTitle className='subTitle'>{this.props.plant.commonName}</SubTitle>
                        </CardTitleContent>
                    </CardTitleHolder>
                    <CardContent className='cardContent'>
                        <Notes show={this.props.plant.notes}>
                            <b>Notes</b><br/>
                            {this.props.plant.notes}
                        </Notes>
                        <Notes show={this.props.plant.link}>
                            <b>Link</b><br/>
                            <a target='_blank' rel='noopener noreferrer' href={this.props.plant.link}>{this.props.plant.link}</a>
                        </Notes>
                    </CardContent>
                    <CardFooter>
                        <CardButton text='Details' onClick={this.handleFlip}></CardButton>
                        <CardButton text='Edit' onClick={this.handleEditClick}></CardButton>
                        <CardButton right={true} onClick={this.handleDelete} text='Delete'></CardButton>
                    </CardFooter>
                </Card>
            </StyledPlant>
        );
    }
}

export default connect()(Plant);
