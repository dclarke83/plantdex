import { 
    REQUEST_PLANTS, 
    RECEIVE_PLANTS,
    ERROR_PLANTS,
    SET_SEARCH,
    SET_LOADING,
    SAVE_PLANT_SUCCESS,
    DELETE_PLANT_SUCCESS,

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
            };
        }
        case SET_SEARCH: {
            return {
                ...state,
                search: action.payload.search
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        case SAVE_PLANT_SUCCESS: {
            let plants = [];
            if (action.payload.isNew) {
                plants = state.plants.concat([ action.payload.response ]);
            } else {
                plants = state.plants.map(plant => {
                    if (plant.id === action.payload.response.id) { plant = action.payload.response; }
                    return plant;
                });
            }

            return {
                ...state,
                plants: plants
            };
        }
        case DELETE_PLANT_SUCCESS: {
            return {
                ...state,
                plants: state.plants.filter(plant => plant.id !== action.payload.id)
            }
        }
        default:
            return state;
    }
}