import { 
    TOGGLE_FILTERS,
    REQUEST_FILTERS,
    RECEIVE_FILTERS,
    ERROR_FILTERS,
    UPDATE_FILTER
} from '../actionTypes';

const initialState = {
    filtersVisible: false,
    loading: false,
    filters: [],
    error: null,
    selectedFilters: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_FILTERS: {
            return {
                ...state,
                filtersVisible: !state.filtersVisible,
            };
        }
        case UPDATE_FILTER: {          
            let selectedFilters;

            if(action.payload.values.length > 0) {
                selectedFilters = 
                    Object.assign(
                        {}, 
                        state.selectedFilters, 
                        {[action.payload.filter]: action.payload.values}
                    );
            } else {
                selectedFilters = 
                    Object.assign(
                        {},
                        state.selectedFilters
                    );
                
                delete selectedFilters[action.payload.filter];
            } 
            return {
                ...state,
                selectedFilters: selectedFilters
            }            
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
                filters: [],
                error: action.payload
            }
        }        
        default:
            return state;
    }
}