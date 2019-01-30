import { combineReducers } from "redux";
import filters from './filters';
import plants from './plants';

const rootReducer = combineReducers({ filters, plants });

export default rootReducer;