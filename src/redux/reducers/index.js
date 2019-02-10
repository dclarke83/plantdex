import { snackbarReducer } from 'react-redux-snackbar';
import { combineReducers } from "redux";
import filters from './filters';
import plants from './plants';
import editing from './editing';

const rootReducer = combineReducers({ filters, plants, editing, snackbar: snackbarReducer });

export default rootReducer;