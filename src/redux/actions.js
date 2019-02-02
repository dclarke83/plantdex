import { 
    TOGGLE_FILTERS, 
    UPDATE_FILTER,
    REQUEST_FILTERS,
    RECEIVE_FILTERS,
    ERROR_FILTERS,
    REQUEST_PLANTS, 
    RECEIVE_PLANTS,
    ERROR_PLANTS,
    SET_SEARCH,    
    SET_LOADING,
    CLEAR_FILTERS,
    OPEN_NEW_PLANT,
    OPEN_EXISTING_PLANT,
    CLOSE_PLANT,
} from './actionTypes';

// FILTERS

export const toggleFilters = () => ({
    type: TOGGLE_FILTERS,
    payload: {}
});

export const clearFilters = () => ({
    type: CLEAR_FILTERS,
    payload: {}
});

export const updateFilter = (filter, values) => ({
    type: UPDATE_FILTER,
    payload: {
        filter: filter,
        values: values
    }
});

export const requestFilters = () => ({
    type: REQUEST_FILTERS,
    payload: {}
});

export const receiveFilters = (json) => ({
    type: RECEIVE_FILTERS,
    payload: {
        filters: json
    }
});

export const errorFilters = (error) => ({
    type: ERROR_FILTERS,
    payload: {
        error: error
    }
});

export const fetchFilters = () => {
    return (dispatch) => {
        dispatch(requestFilters())
        return fetch('http://localhost:8080/filters')
            .then(response => response.json())
            .then((json) => {
                const filters = json || [];
                dispatch(receiveFilters(filters));
            },
            (error) => {
                dispatch(errorFilters(error));
            })
    }
};

// PLANTS
export const setLoading = (loadingState) => ({
    type: SET_LOADING,
    payload: {
        loading: loadingState
    }
});

export const requestPlants = () => ({
    type: REQUEST_PLANTS,
    payload: {}
});

export const receivePlants = (json) => ({
    type: RECEIVE_PLANTS,
    payload: {
        plants: json
    }
});

export const errorPlants = (error) => ({
    type: ERROR_PLANTS,
    payload: {
        error: error
    }
});

export const fetchPlants = () => {
    return (dispatch) => {
        dispatch(requestPlants())
        return fetch('http://localhost:8080/plants')
            .then(response => response.json())
            .then((json) => {
                dispatch(receivePlants(json));
            },
            (error) => {
                dispatch(errorPlants(error));
            })
    }
};

export const setSearch = (searchString) => ({
    type: SET_SEARCH,
    payload: {
        search: searchString
    }
});

export const openNewPlant = () => ({
    type: OPEN_NEW_PLANT,
    payload: {}
});

export const openExistingPlant = (id) => ({
    type: OPEN_EXISTING_PLANT,
    payload: {
        id: id
    }
});

export const closePlant = () => ({
    type: CLOSE_PLANT,
    payload: {}
});