import React, { Component } from 'react';
import './spinner.css';

class Spinner extends Component {
    render() {
        return (
            <div>
            {
                this.props.loading &&
                <div className='cssload-container'>
                    <div className='cssload-item cssload-moon'></div>
                </div>
            }
            </div>
        );
    }
};

export default Spinner;