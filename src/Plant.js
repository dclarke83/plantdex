import React, { Component } from 'react';
import styled from 'styled-components';

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
    background-image: ${props => formatBg(props.image) || null }; /*'url(https://via.placeholder.com/500x120)' }; */
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
    flex-wrap: wrap-reverse;
    justify-content: space-between;
    align-items: flex-end;

`;

const StyledPlant = styled.li`
    flex: 1 0 300px;
    margin: 10px;
    display: flex;
    flex-direction: column;
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
    render() {
        return (
            <StyledPlant className='styledPlant'>
                <Card className='card'>
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
                            <StyledProperty name='Moisture' value={this.props.plant.Moisture}></StyledProperty>
                            <StyledProperty name='Hardiness' value={this.props.plant.hardiness}></StyledProperty>
                            <StyledProperty name='Purchased' value={this.props.plant.purchased}></StyledProperty>
                            <StyledProperty name='Height' value={this.props.plant.height + ' (' + this.props.plant.ageToMaxHeight + ')'}></StyledProperty>
                        </PropertyBox>
                    </CardContent>
                </Card>
            </StyledPlant>
        );
    }
}

export default Plant;