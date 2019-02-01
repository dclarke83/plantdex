import { 
    REQUEST_PLANTS, 
    RECEIVE_PLANTS,
    ERROR_PLANTS,
    SET_SEARCH,
    SET_LOADING,

} from '../actionTypes';

const initialState = {
    plants: [],
    loading: false,
    error: null,
    search: '',
};

export default function(state = initialState, action) {
    switch(action.type) {
        case REQUEST_PLANTS: {
            return {
                ...state,
                loading: true
            };
        }
        case RECEIVE_PLANTS: {
            return {
                ...state,
                loading: false,
                plants: action.payload.plants,
                error: null
            };
        }       
        case ERROR_PLANTS: {
            return {
                ...state,
                loading: false,
                plants: [],
                error: action.payload
            }
        }
        case SET_SEARCH: {
            return {
                ...state,
                search: action.payload.search
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        default:
            return state;
    }
}