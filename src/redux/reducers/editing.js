import {
    OPEN_NEW_PLANT,
    CLOSE_NEW_PLANT,
} from '../actionTypes';

const initialState = {
    newPlantModelOpen: false,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case OPEN_NEW_PLANT: {
            return {
                ...state,
                newPlantModelOpen: true
            }
        }
        case CLOSE_NEW_PLANT: {
            return {
                ...state,
                newPlantModelOpen: false
            }
        }
        default:
            return state;        
    }
}