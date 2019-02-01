import { combineReducers } from "redux";
import filters from './filters';
import plants from './plants';
import editing from './editing';

const rootReducer = combineReducers({ filters, plants, editing });

export default rootReducer;