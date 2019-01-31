import { createSelector } from 'reselect';

export const getFiltersState = store => store.filters;
export const getPlantsState = store => store.plants;

export const getFiltersVisibility = store => 
    getFiltersState(store) ? getFiltersState(store).filtersVisible : false;

export const getSelectedFilters = store => store.filters.selectedFilters;

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
                    if(!plant.hasOwnProperty(filter + 'Arr')) {
                        // If the filter is for a plant string property
                        return filters[filter].indexOf(plant[filter].toLowerCase()) >= 0;
                    } else {
                        // If the filter is for a plant array property
                        return filters[filter].some(r => plant[filter + 'Arr'].indexOf(r) >= 0);
                    }
                })
            });
        } else {
            return plants;
        }
    }
);