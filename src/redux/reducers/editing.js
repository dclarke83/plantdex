import {
    OPEN_NEW_PLANT,
    OPEN_EXISTING_PLANT,
    CLOSE_PLANT,
} from '../actionTypes';

const initialState = {
    newPlantModelOpen: false,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case OPEN_NEW_PLANT: {
            let newState = {
                ...state,
                newPlantModelOpen: true
            }
            delete newState.plantId;
            return newState;
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
                ...state,
                newPlantModelOpen: false
            }
        }
        default:
            return state;        
    }
}