import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import Select from 'react-select';
import { closePlant, savePlant } from './redux/actions';
import { getNewPlantInfo } from './redux/selectors';

Modal.setAppElement('#root');

const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999
    },
    content: {
        bottom: '100px',
        padding: 0,
        borderRadius: '6px',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
        border: 0
    }
};

const FormArea = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const FormField = styled.label`
    flex: 1 1 50%;
    display: flex;

    input, textarea {
        width: 100%;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        padding: 9px;
        font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
        font-size: 14px;
        font-weight: 300;
        color: #808080;

    }
`;

const SelectField = styled.label`
    flex: 0 1 49%;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
`;

const ImageArea = styled.div`
    margin: 0;
    padding: 0 15px;
    background-color: #cbcbcb;
    min-height: 120px;
    background-image: ${props => formatBg(props.image) || null };
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;   
    margin-bottom: 10px; 
    cursor: pointer;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 0.1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const CardTitleContent = styled.div`
    display: inline-block;
    padding: 15px;
    margin-top: 20px;
    margin-right: 0;
    border-radius: 3px;
    color: #fff;
    z-index: 19999;
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

const formatBg = (path) => {
    let output = false;
    if (path) {
        output = 'url("' + path + '")';
    }
    return output;
} 

class NewPlant extends Component {
    constructor(props){
        super(props);

        this.state = {
            initial: true
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose(e) {
        this.props.dispatch(closePlant());
    };

    handleChange = field => value => {
        const newValue = (value.target) ? value.target.value : value;
        this.setState({
            [field]: newValue
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(savePlant(this.state));
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // Set state from props only when we're ready 
        // (I.e. when moisture array is set from remote filter data
        // and uuid for id has been generated in the selector)
        if(nextProps.plant.moisture && nextProps.plant.id && prevState.id !== nextProps.plant.id) {
            return {
                 ...nextProps.plant,
                 initial: false
            };
        } else {
            return prevState;
        }
    }    

    render() {
        return (
            <div>
                <Modal isOpen={this.props.newPlantModelOpen} style={styles}>
                    <form onSubmit={this.handleSubmit}>
                        <ImageArea image={this.state.mainImage}>
                            <CardTitleContent>
                                <Title>{
                                    (this.state.name) ? this.state.name : 'New Plant'
                                }</Title>
                                <SubTitle>
                                    {this.state.commonName}
                                </SubTitle>
                            </CardTitleContent>
                        </ImageArea>
                        <FormArea>
                            <FormField>
                                <input type='text' placeholder='Latin Name' id='name' name='name' value={this.state.name} onChange={this.handleChange('name')}></input>
                            </FormField>

                            <FormField>
                                <input type='text' placeholder='Common Name' id='commonName' name='commonName' value={this.state.commonName} onChange={this.handleChange('commonName')}></input>
                            </FormField>
                        </FormArea>

                        <FormArea>
                        {this.props.selectFields.map((field) => (
                            <SelectField key={field.name}>
                                <Select 
                                    name={field.name} 
                                    placeholder={field.name}
                                    value={this.state[field.name]} 
                                    onChange={this.handleChange(field.name)}
                                    isMulti={field.multi}
                                    isClearable={true}
                                    options={field.options}
                                ></Select>
                            </SelectField>
                        ))}
                        </FormArea>
                        <FormArea>
                            <FormField>
                                <textarea rows='4' name='notes' placeholder='Notes' value={this.state.notes} onChange={this.handleChange('notes')}></textarea>
                            </FormField>
                        </FormArea>
                        <button type='submit'>Save</button>
                        <button onClick={this.handleClose}>Close</button>
                    </form>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return getNewPlantInfo(state);
}

export default connect(mapStateToProps)(NewPlant);