import { createSelector } from 'reselect';
import uuid from 'uuid';

export const getEditingState = store => store.editing;

export const getPlantsState = store => store.plants;
export const getPlants = store => getPlantsState(store).plants;

export const getFiltersState = store => store.filters;
export const getFiltersVisibility = store => 
    getFiltersState(store) ? getFiltersState(store).filtersVisible : false;
export const getSelectedFilters = store => store.filters.selectedFilters;
export const getAvailableFilters = store => store.filters.filters;

export const getSearchedPlants = createSelector(
    [getPlantsState],
    (state) => {
        return state.plants.filter(plant => {
            const regex = new RegExp(state.search, 'gi');
            return plant.name.match(regex) || plant.commonName.match(regex);
        });
    }
);

export const getFilteredPlants = createSelector(
    [getSearchedPlants, getSelectedFilters],
    (plants, filters) => {
        if(filters){
            const filterKeys = Object.keys(filters);

            return plants.filter(plant => {
                return filterKeys.every(filter => {
                    if(!Array.isArray(plant[filter])) {
                        // If the filter is for a plant string property
                        return filters[filter].indexOf(plant[filter].toLowerCase()) >= 0;
                    } else {
                        // If the filter is for a plant array property
                        return filters[filter].some(r => plant[filter].indexOf(r) >= 0);
                    }
                })
            });
        } else {
            return plants;
        }
    }
);

export const getFilterStatus = createSelector(
    [getSelectedFilters, getAvailableFilters],
    (selected, filters) => {
        const keys = Object.keys(selected);
        const formatted = keys.map(key => {
            const filterOptions = filters.find(filter => {
                return filter.name === key;
            }).options;

            const selectedOptions = selected[key].map(option => {
                return filterOptions.find(filterOption => {
                    return filterOption.value === option;
                }).label;
            });
            return { filter: key.toUpperCase(), values: selectedOptions };
        });
        return formatted;
    }
);

export const getFiltersAsObj = createSelector(
    [getAvailableFilters],
    (filters) => {
        return filters.reduce((newFilters, filter) => {
            newFilters[filter.name] = filter;
            return newFilters;
        }, {});
    }
);

export const getNewPlantInfo = createSelector(
    [getEditingState, getAvailableFilters, getFiltersAsObj, getPlants],
    (editing, filtersArr, filtersObj, plants) => {
        let editingPlant = {};

        if(editing.plantId) {
            const plant = Object.assign({}, plants.find(plant => plant.id === editing.plantId));
            const plantKeys = Object.keys(plant);

            editingPlant = plantKeys.reduce((newPlant, plantKey) => {
                if(filtersObj.hasOwnProperty(plantKey)){
                    if(Array.isArray(plant[plantKey])) {
                        newPlant[plantKey] = filtersObj[plantKey].options.filter(option => plant[plantKey].indexOf(option.value) >= 0);
                    } else {
                        newPlant[plantKey] = filtersObj[plantKey].options.filter(option => plant[plantKey] === option.value);
                    }
                } else {
                    newPlant[plantKey] = plant[plantKey];
                }
                return newPlant;
            }, {});
        } else {
            editingPlant = {
                id: uuid(),
                name: '',
                commonName: '',
                purchased: '',
                notes: '',
                link: '',
                mainImage: '',
                height: '',
                spread: '',
                ageToMaxHeight: '',
                 ...filtersArr.reduce((obj, filter) => {
                    obj[filter.name] = (filter.multi) ? [] : '';
                    return obj;
                }, {})
            };
        }

        return {
            ...editing,
            selectFields: filtersArr,
            plant: editingPlant
        };
    }
);

