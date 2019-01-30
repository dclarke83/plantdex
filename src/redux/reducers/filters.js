import { 
    TOGGLE_FILTERS,
    REQUEST_FILTERS,
    RECEIVE_FILTERS,
    ERROR_FILTERS
} from '../actionTypes';

const initialState = {
    filtersVisible: false,
    loading: false,
    filters: {},
    error: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_FILTERS: {
            return {
                ...state,
                filtersVisible: !state.filtersVisible,
            };
        }
        case REQUEST_FILTERS: {
            return {
                ...state,
                loading: true
            };
        }
        case RECEIVE_FILTERS: {
            return {
                ...state,
                loading: false,
                filters: action.payload.filters,
                error: null
            };
        }       
        case ERROR_FILTERS: {
            return {
                ...state,
                loading: false,
                filters: {},
                error: action.payload
            }
        }        
        default:
            return state;
    }
}