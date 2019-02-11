import { generateNewPlant } from '../../helpers/plant-helpers';
import {
    OPEN_NEW_PLANT,
    OPEN_EXISTING_PLANT,
    CLOSE_PLANT,
    RECEIVE_PLANT_INFO,
    DONE_PLANT_INFO,
    ERROR_PLANT_INFO,
    REQUEST_PLANT_INFO,
    SAVE_PLANT_SUCCESS,
} from '../actionTypes';

const initialState = {
    newPlantModelOpen: false,
    refresh: false,
    newPlant: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case OPEN_NEW_PLANT: {
            const newPlant = generateNewPlant();
            let newState = {
                ...state,
                newPlantModelOpen: true,
                newPlant: newPlant
            }
            delete newState.plantId;
            return newState;
        }
        case SAVE_PLANT_SUCCESS: {
            return {
                ...state,
                plantId: action.payload.response.id
            };
        }
        case OPEN_EXISTING_PLANT: {
            return {
                ...state,
                newPlantModelOpen: true,
                plantId: action.payload.id
            }
        }
        case CLOSE_PLANT: {
            return {
                newPlant: {},
                refresh: false,
                newPlantModelOpen: false
            }
        }
        case RECEIVE_PLANT_INFO: {
            return {
                ...state,
               newPlant: Object.assign({}, state.newPlant, action.payload.info),
               refresh: true
            };
        }
        case REQUEST_PLANT_INFO: {
            return {
                ...state,
                refresh: false,
                searchStatus: 'searching'
            };
        }        
        case DONE_PLANT_INFO: {
            return {
                ...state,
                refresh: false,
                searchStatus: 'success'
            };
        }
        case ERROR_PLANT_INFO: {
            return {
                ...state,
                refresh: false,
                searchStatus: 'error'
            };
        }        
        default:
            return state;        
    }
}