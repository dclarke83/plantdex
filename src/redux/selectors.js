export const getFiltersState = store => store.filters;

export const getFiltersVisibility = store => 
    getFiltersState(store) ? getFiltersState(store).filtersVisible : false;