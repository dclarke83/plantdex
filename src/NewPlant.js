import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import Select from 'react-select';
import ReactTags from 'react-tag-autocomplete';
import uuid from 'uuid';
import { closePlant, savePlant, fetchPlantInfo, donePlantInfo } from './redux/actions';
import { getNewPlantInfo } from './redux/selectors';
import './tags-styles.css';
import './modal.css';
import './font-awesome-animation.min.css';
import ErrorBoundary from './ErrorBoundary';
import { FaSearch, FaSpinner, FaCheck, FaTimesCircle, FaTimes } from 'react-icons/fa';
import StyledButton from './StyledButton';

//#region styles
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
        border: 0,
        color: '#333',
        overflowY: 'hidden',
        overflowX: 'hidden'
    }
};

const FormContent = styled.div`
    height: calc(100% - 180px);
    overflow-y: auto;
    position: absolute;
    width: 100%;
`;

const FormArea = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-bottom: 5px;
    
`;

const FormFooter = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: #fff;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 10px 5px 10px 5px;
    border-top: 1px solid #bababa;
`;

const FormField = styled.label`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: ${props => (props.cols) ? ((Math.round(100 / props.cols,0)) + '%') : '50%' };
    display: flex;

    @media (max-width: 700px) {
        flex-basis: 100%;
        margin-bottom: 5px;
    }

    div.schedule-months {
        width: 100%;
        display: flex;
        margin-left: 5px;
        margin-right: 5px;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

        label {
            text-align: center;
            font-size: 0.75em;
            line-height: 1.35em;

            input[type=checkbox] {
                margin: 0 0 0 3px;
                display: block;
            }
        }
    }

    input[type=text], textarea {
        width: 100%;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        padding: 9px;
        font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
        font-size: 14px;
        font-weight: 300;
        color: #333;
    }
`;

const SelectField = styled.label`
    margin-bottom: 5px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: ${props => (props.cols) ? ((Math.round(100 / props.cols,0)) + '%') : '50%' };

    @media (max-width: 700px) {
        flex-basis: 100%;
    }    
`;

const StyledSelect = styled(Select)`
    &.plantdex-select-container {
        margin-left: 5px;
        margin-right: 5px;
    }
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

//#endregion

const SearchIcon = (props) => {
    switch(props.searchStatus){
        case 'searching': {
            return <FaSpinner className='faa-spin animated' />
        }
        case 'success': {
            return <FaCheck />
        }
        case 'error': {
            return <FaTimesCircle/>
        }
        default: {
            return <FaSearch />;
        }
    }
}

if (process.env.NODE_ENV !== 'test') Modal.setAppElement(document.getElementById('root'));

class NewPlant extends Component {
    constructor(props){
        super(props);

        this.state = {
            initial: true,
            refresh: false,
            areas: [],
            schedules: [],
            link: '',
            months: [
                { value: 1, label: 'Jan' }, { value: 2, label: 'Feb' }, { value: 3, label: 'Mar' },
                { value: 4, label: 'Apr' }, { value: 5, label: 'May' }, { value: 6, label: 'Jun' },
                { value: 7, label: 'Jul' }, { value: 8, label: 'Aug' }, { value: 9, label: 'Sep' },
                { value: 10, label: 'Oct' }, { value: 11, label: 'Nov' }, { value: 12, label: 'Dec' }
            ]
        };

        this.handleLookupPlantInfo = this.handleLookupPlantInfo.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAreaAddition = this.handleAreaAddition.bind(this);
        this.handleAreaDelete = this.handleAreaDelete.bind(this);
        this.handleAddSchedule = this.handleAddSchedule.bind(this);
    }

    handleLookupPlantInfo() {
        this.props.dispatch(fetchPlantInfo(this.props.plant.id, this.state.link));
    }

    handleClose(e) {
        this.props.dispatch(closePlant());
    };

    handleChange = field => value => {
        const newValue = (value && value.target) ? value.target.value : value;

        switch(field){
            case 'scheduleMonthCheck':{
                const details = value.target.name.split('_');
                const checked = value.target.checked;
                const scheduleId = details[0];
                const month = details[1];
                let newSchedule = this.state.schedules.find(schedule => schedule.id === scheduleId);
                newSchedule.months[month] = checked;
                this.setState({
                    schedules: this.state.schedules.map(schedule => (schedule.id === scheduleId) ? schedule = newSchedule : schedule)
                });
                break;
            }
            case 'scheduleName':{
                const scheduleId = value.target.name;
                let newSchedule = this.state.schedules.find(schedule => schedule.id === scheduleId);
                newSchedule.name = newValue;
                this.setState({
                    schedules: this.state.schedules.map(schedule => (schedule.id === scheduleId) ? schedule = newSchedule : schedule)
                });
                break;
            }
            default:{
                this.setState({
                    [field]: newValue
                });
                break;
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const saveState = {
            ...this.state,
            isNew: this.props.plant.isNew
        }
        this.props.dispatch(savePlant(saveState));
    }

    handleAreaAddition(tag) {
        const tags = [].concat(this.state.areas, tag);
        this.setState({ areas: tags });
    }

    handleAreaDelete(i){
        const tags = this.state.areas.slice(0);
        tags.splice(i, 1);
        this.setState({ areas: tags });
    }

    handleDeleteSchedule(scheduleId) {
        const position = this.state.schedules.findIndex(schedule => schedule.id === scheduleId);
        const newSchedules = this.state.schedules.slice(0);
        newSchedules.splice(position, 1);
        this.setState({ schedules: newSchedules });
    }

    handleAddSchedule() {
        const schedules = [].concat(this.state.schedules, [{
            id: uuid(),
            name: '',
            months: this.state.months.reduce((output, month) => { output[month.label] = false; return output; }, {})
        }]);
        this.setState({ schedules: schedules });
    }

    capitalise(text) {
        return text[0].toUpperCase() + text.substring(1);
    }

    componentDidUpdate(prevProps){
        if(!prevProps.refresh && this.props.refresh){
            this.props.dispatch(donePlantInfo())
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // Set state from props only when we're ready 
        // (I.e. when moisture array is set from remote filter data
        // and uuid for id has been generated in the selector)
        if((nextProps.plant.moisture && nextProps.plant.id && prevState.id !== nextProps.plant.id) || (prevState.refresh !== nextProps.refresh)) {            
            return {
                 ...nextProps.plant,
                 initial: false,
                 refresh: false
            };
        } else {
            return prevState;
        }
    }    

    render() {
        return (
            <div>
                <ErrorBoundary>
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
                            <FormContent>
                                <FormArea>
                                    <FormField>
                                        <input type='text' tabIndex='0' placeholder='Latin Name' id='name' name='name' value={this.state.name} onChange={this.handleChange('name')}></input>
                                    </FormField>

                                    <FormField>
                                        <input type='text' placeholder='Common Name' id='commonName' name='commonName' value={this.state.commonName} onChange={this.handleChange('commonName')}></input>
                                    </FormField>
                                </FormArea>

                                <FormArea>
                                {this.props.selectFields.map((field) => (
                                    <SelectField key={field.name}>
                                        <StyledSelect 
                                            className='plantdex-select-container'
                                            classNamePrefix='plantdex-select'
                                            name={field.name} 
                                            placeholder={this.capitalise(field.name)}
                                            value={this.state[field.name]} 
                                            onChange={this.handleChange(field.name)}
                                            isMulti={field.multi}
                                            isClearable={true}
                                            options={field.options}
                                        ></StyledSelect>
                                    </SelectField>
                                ))}
                                </FormArea>
                                <FormArea>
                                        <ReactTags
                                            tags={this.state.areas}
                                            suggestions={this.props.suggestions}
                                            handleAddition={this.handleAreaAddition}
                                            handleDelete={this.handleAreaDelete}
                                            allowNew={true}
                                            autoresize={false}
                                            placeholder='Plant location(s)'
                                        />
                                </FormArea>
                                <FormArea>
                                    <FormField>
                                        <input type='text' placeholder='Main Image' id='mainImage' name='mainImage' value={this.state.mainImage} onChange={this.handleChange('mainImage')}></input>
                                    </FormField>                            
                                    <FormField>
                                        <input type='text' placeholder='Link' id='link' name='link' value={this.state.link} onChange={this.handleChange('link')}></input>
                                        <StyledButton 
                                            type='button' 
                                            onClick={this.handleLookupPlantInfo}
                                            disabled={this.state.link.length === 0}
                                            children={<SearchIcon searchStatus={this.props.searchStatus} />}>
                                        </StyledButton>
                                    </FormField>                                                        
                                </FormArea>
                                <FormArea>
                                    <FormField cols='4'>
                                        <input type='text' placeholder='Height' id='height' name='height' value={this.state.height} onChange={this.handleChange('height')} />
                                    </FormField>
                                    <FormField cols='4'>
                                        <input type='text' placeholder='Spread' id='spread' name='spread' value={this.state.spread} onChange={this.handleChange('spread')} />
                                    </FormField>
                                    <FormField cols='4'>
                                        <input type='text' placeholder='Age to maximum height' id='ageToMaxHeight' name='ageToMaxHeight' value={this.state.ageToMaxHeight} onChange={this.handleChange('ageToMaxHeight')} />
                                    </FormField> 
                                    <FormField cols='4'>
                                        <input type='text' placeholder='Purchased' id='purchased' name='purchased' value={this.state.purchased} onChange={this.handleChange('purchased')} />
                                    </FormField>                                                                                        
                                </FormArea>
                                {this.state.schedules.map(schedule => (
                                    <FormArea key={schedule.id} >
                                        <FormField cols='2'>
                                            <input type='text' name={schedule.id} placeholder='Enter schedule name' value={schedule.name} onChange={this.handleChange('scheduleName')} />
                                        </FormField>
                                        <FormField>
                                            <div className='schedule-months'>
                                                {this.state.months.map(month => (
                                                    <label key={month.value}>
                                                        {month.label}
                                                        <input type='checkbox' name={schedule.id + '_' + month.label} checked={schedule.months[month.label]} onChange={this.handleChange('scheduleMonthCheck')}/>
                                                    </label>
                                                ))}
                                            </div>
                                            <StyledButton type='button' onClick={() => this.handleDeleteSchedule(schedule.id)} children={<FaTimes />}></StyledButton>
                                        </FormField>
                                    </FormArea>
                                ))}
                                <FormArea>
                                    <FormField>
                                        <textarea rows='4' name='notes' placeholder='Notes' value={this.state.notes} onChange={this.handleChange('notes')}></textarea>
                                    </FormField>
                                </FormArea>
                            </FormContent>
                            <FormFooter>
                                <div>
                                    <StyledButton type='submit' text='Save' />
                                    <StyledButton type='button' text='Add Schedule' onClick={this.handleAddSchedule} />
                                </div>
                                <StyledButton type='button' text='Close' onClick={this.handleClose} />
                            </FormFooter>                        
                        </form>

                    </Modal>
                </ErrorBoundary>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return getNewPlantInfo(state);
}

export default connect(mapStateToProps)(NewPlant);