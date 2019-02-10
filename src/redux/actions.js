//import { post, put, remove } from '../helpers/ajax';
import { API } from 'aws-amplify';
import { transformPlantForSaving } from '../helpers/plant-helpers';
import { showSnack } from 'react-redux-snackbar';
import uuid from 'uuid';

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
    DELETE_PLANT_SUCCESS,
    DELETE_PLANT_ERROR,
    REQUEST_PLANT_INFO,
    ERROR_PLANT_INFO,
    RECEIVE_PLANT_INFO,
    DONE_PLANT_INFO,
} from './actionTypes';

//const apiUrl = 'http://localhost:8080/'; //OLD / Local

const apiName = 'plantdexapi';
const plantRoute = '/plants';
const filterRoute = '/filters';
const scrapeRoute = '/info'

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
        return API.get(apiName, filterRoute)
            .then(response => {
                dispatch(receiveFilters(response));
            })
            .catch(error => {
                dispatch(errorFilters(error));
            });
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

const cleanStrings = (data) => {
    return JSON.parse((JSON.stringify(data).replace(new RegExp('" "', 'g'), '""')));
};

export const fetchPlants = () => {
    return (dispatch) => {
        dispatch(requestPlants())
        return API.get(apiName, plantRoute)
            .then(response => {
                dispatch(receivePlants(cleanStrings(response)));              
            })
            .catch(error => {
                dispatch(errorPlants(error));
                dispatch(showSnack(uuid(), {
                    label: 'Error loading plant data',
                    timeout: 7000,
                    button: { label: 'OK' }
                }));
            });
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
    if(plant.isNew) {
        return API.post(apiName, plantRoute, {
            body: transformPlantForSaving(plant)
        });
    } else {
        return API.put(apiName, plantRoute, {
            body: transformPlantForSaving(plant)
        });
    }
}

export const savePlant = (plant) => {
    return (dispatch) => {
        return plantStatus(plant)
            .then((json) => {
                dispatch(savePlantSuccess(plant, plant.isNew));
                dispatch(showSnack(uuid(), {
                    label: 'Save was successful',
                    timeout: 2500
                }));                  
            },
            (error) => {
                dispatch(savePlantError(error));
                dispatch(showSnack(uuid(), {
                    label: 'Error attempting to save',
                    timeout: 2500
                }));                             
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

export const deletePlant = (id) => {
    return (dispatch) => {
        return API.del(apiName, plantRoute + '/object/' + id)
        .then(() => {
            dispatch(deletePlantSuccess(id));
            dispatch(showSnack(uuid(), {
                label: 'Plant deleted',
                timeout: 2500
            }));                
        })
        .catch(error => {
            dispatch(deletePlantError(error));
            dispatch(showSnack(uuid(), {
                label: 'Error deleting plant',
                timeout: 2500
            }));                
        });
    }
}

export const deletePlantSuccess = (id) => ({
    type: DELETE_PLANT_SUCCESS,
    payload: {
        id: id
    }
});

export const deletePlantError = (error) => ({
    type: DELETE_PLANT_ERROR,
    payload: {
        error: error
    }
});

export const requestPlantInfo = () => ({
    type: REQUEST_PLANT_INFO,
    payload: {}
});

export const receivePlantInfo = (id, info) => ({
    type: RECEIVE_PLANT_INFO,
    payload: {
        info: info,
        id: id
    }
});

export const errorPlantInfo = () => ({
    type: ERROR_PLANT_INFO,
    payload: {}
});

export const donePlantInfo = () => ({
    type: DONE_PLANT_INFO,
    payload: {}
});

export const fetchPlantInfo = (id, detail) => {
    return (dispatch) => {
        dispatch(requestPlantInfo())
        return API.get(apiName, scrapeRoute + '/' + encodeURIComponent(detail))
            .then(response => {
                dispatch(receivePlantInfo(id, response));
                dispatch(showSnack(uuid(), {
                    label: 'Successfully retrieved plant data',
                    timeout: 2500
                }));                    
            })
            .catch(error => {
                dispatch(errorPlantInfo(error));
                dispatch(showSnack(uuid(), {
                    label: 'Error retrieving plant data',
                    timeout: 2500
                }));                    
            });
    }
};