import { 
    TOGGLE_FILTERS, 
    REQUEST_PLANTS, 
    RECEIVE_PLANTS,
    ERROR_PLANTS,
    SET_SEARCH,
} from './actionTypes';

const formatPlant = (plant) => {
    const splitFields = [
        'exposure',
        'moisture',
        'soil',
        'pH',
        'sunlight'
    ];

    let newPlant = {
        ...plant
    };

    splitFields.map((field) => (
        newPlant[field + 'Arr'] = plant[field].toLowerCase().split('/')
    ));

    return newPlant;
}

export const toggleFilters = () => ({
    type: TOGGLE_FILTERS,
    payload: {}
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
                const formattedPlants = json.map((plant) => (formatPlant(plant)));
                dispatch(receivePlants(formattedPlants));
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