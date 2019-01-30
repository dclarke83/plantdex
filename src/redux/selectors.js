import { createSelector } from 'reselect';

export const getFiltersState = store => store.filters;
export const getPlantsState = store => store.plants;

export const getFiltersVisibility = store => 
    getFiltersState(store) ? getFiltersState(store).filtersVisible : false;

export const getSearchedPlants = createSelector(
    [getPlantsState],
    (state) => {
        return state.plants.filter(plant => {
            const regex = new RegExp(state.search, 'gi');
            return plant.name.match(regex) || plant.commonName.match(regex);
        });
    }
);
