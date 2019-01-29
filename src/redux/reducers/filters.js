import { TOGGLE_FILTERS } from '../actionTypes';

const initialState = {
    filtersVisible: false,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_FILTERS: {
            return {
                ...state,
                filtersVisible: !state.filtersVisible,
            };
        }
        default:
            return state;
    }
}