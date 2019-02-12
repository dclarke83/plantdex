import { createSelector } from 'reselect';
import uuid from 'uuid';
import { transformPlantForEditing, transformPlantForViewing } from '../helpers/plant-helpers';

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

export const getSearchedFilteredFormattedPlants = createSelector(
    [getFilteredPlants, getFiltersAsObj],
    (plants, filters) => {
        return plants.map(plant => {
            return transformPlantForViewing(plant, filters);
        });
    }
);

export const getDistinctAreas = createSelector(
    [getPlants],
    (plants) => {
        let result = [];
        result =  Object.keys(plants.reduce((areas, plant) => {
                if(plant.areas) {
                    plant.areas.forEach(area => {
                        if(area && area.name && !areas[area.name]) {
                            areas[area.name] = true;
                        }
                    });
                }
            return areas;
        }, {})).reduce((output, tag) => {
                output.push({ name: tag, id: uuid() });
            return output;
        }, []);
        return result;
    }
);

export const getNewPlantInfo = createSelector(
    [getEditingState, getAvailableFilters, getFiltersAsObj, getPlants, getDistinctAreas],
    (editing, filtersArr, filtersObj, plants, areas) => {
        let editingPlant = {};

        if(editing.plantId) {
            const plant = Object.assign({}, plants.find(plant => plant.id === editing.plantId));
            editingPlant = transformPlantForEditing(plant, filtersObj);            
            editingPlant.isNew = false;
        } else {
            editingPlant = transformPlantForEditing(editing.newPlant, filtersObj);
            editingPlant.isNew = true;
        }

        return {
            ...editing,
            selectFields: filtersArr,
            plant: editingPlant,
            suggestions: areas
        };
    }
);

export const getPlantsByArea = createSelector(
    [getDistinctAreas, getSearchedFilteredFormattedPlants],
    (areas, plants) => {
        const output = areas.map(area => {
            area.plants = plants.filter(plant => {
                if(plant.areas) {
                    return plant.areas.some(m => m.name === area.name);
                }
                return false;
            });
            return area;
        });

        return {
            areas: output
        };
    }
);

export const getDistinctSchedules = createSelector(
    [getSearchedFilteredFormattedPlants],
    (plants) => {
        const months = [
            { value: 1, label: 'Jan' }, { value: 2, label: 'Feb' }, { value: 3, label: 'Mar' },
            { value: 4, label: 'Apr' }, { value: 5, label: 'May' }, { value: 6, label: 'Jun' },
            { value: 7, label: 'Jul' }, { value: 8, label: 'Aug' }, { value: 9, label: 'Sep' },
            { value: 10, label: 'Oct' }, { value: 11, label: 'Nov' }, { value: 12, label: 'Dec' }
        ];
        let result = [];

        months.forEach(month => {           
            let monthSchedules = {
                monthValue: month.value,
                monthLabel: month.label,
                schedules: []
            };

            plants.forEach(plant => {
                if(plant.schedules && Array.isArray(plant.schedules) && plant.schedules.length > 0) {
                    plant.schedules.forEach(schedule => {
                        if(schedule.months[month.label] === true) {
                            const i = monthSchedules.schedules.findIndex(x => x.name === schedule.name);
                            if(i !== -1){
                                monthSchedules.schedules[i].plants.push(plant);
                            } else {
                                monthSchedules.schedules.push({
                                    name: schedule.name,
                                    plants: [ plant ]
                                });
                            }
                        }
                    });
                }
            });

            result.push(monthSchedules);
        });
        return { schedules: result };
    }
);