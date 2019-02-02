import { post, put } from '../helpers/ajax';
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
    SAVE_PLANT_SUCCESS,
    SAVE_PLANT_ERROR,
} from './actionTypes';

const apiUrl = 'http://localhost:8080/';

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
        return fetch(apiUrl + 'filters')
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
        return fetch(apiUrl + 'plants')
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

const plantStatus = (plant) => {
    return (plant.isNew) ? post(apiUrl + 'plants', transformPlantForSaving(plant)) : put(apiUrl + 'plants/' + plant.id, transformPlantForSaving(plant));
}

export const savePlant = (plant) => {
    return (dispatch) => {
        return plantStatus(plant)
            .then((json) => {
                console.log(json);
                dispatch(savePlantSuccess(json, plant.isNew));
            },
            (error) => {
                console.log(error);
                dispatch(savePlantError(error));
            })
    }
};

export const savePlantSuccess = (response, isNew) => ({
    type: SAVE_PLANT_SUCCESS,
    payload: {
        response: response,
        isNew: isNew
    }
});

export const savePlantError = (error) => ({
    type: SAVE_PLANT_ERROR,
    payload: {
        error: error
    }
});

const transformPlantForSaving = (plant) => {
    const STRING = 'STRING';
    const SINGLE = 'SINGLE';
    const MULTI = 'MULTI';

    const schema = {
        name: STRING,
        commonName: STRING,
        mainImage: STRING,
        url: STRING,
        purchased: STRING,
        notes: STRING,
        height: STRING,
        spread: STRING,
        ageToMaxHeight: STRING,

        exposure: SINGLE,
        foliage: SINGLE,
        habit: SINGLE,
        hardiness: SINGLE,
        type: SINGLE,

        moisture: MULTI,
        pH: MULTI,
        soil: MULTI,
        sunlight: MULTI
    };

    const schemaKeys = Object.keys(schema);

    return schemaKeys.reduce((newPlant, key) => {
        switch (schema[key]) {
            case SINGLE: {
                newPlant[key] = (plant[key] && plant[key].length > 0) ? plant[key][0].value : '';
                break;
            }
            case MULTI: {
                newPlant[key] = (plant[key] && plant[key].length > 0) ? plant[key].map(option => { return option.value; }) : [];
                break;
            }
            case STRING:
            default: {
                newPlant[key] = (plant[key]) ? plant[key] : '';
            }
        }
        return newPlant;
    }, {});
}