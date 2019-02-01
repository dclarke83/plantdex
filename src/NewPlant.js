import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { closeNewPlant } from './redux/actions';
import { getEditingState } from './redux/selectors';

Modal.setAppElement('#root');

const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999
    },
    content: {
        bottom: '100px'
    }
};

class NewPlant extends Component {
    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e) {
        this.props.dispatch(closeNewPlant());
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.props.newPlantModelOpen} style={styles}>
                    <button onClick={this.handleClose}>Close</button>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return getEditingState(state);
}

export default connect(mapStateToProps)(NewPlant);