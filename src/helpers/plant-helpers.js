export const STRING = 'STRING';
export const SINGLE = 'SINGLE';
export const MULTI = 'MULTI';
export const TAGS = 'TAGS';

const schema = {
    id: STRING,

    name: STRING,
    commonName: STRING,
    mainImage: STRING,
    url: STRING,
    link: STRING,
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
    sunlight: MULTI,
    areas: TAGS
};

export const transformPlantForSaving = (plant, plantSchema = schema) => {
    const schemaKeys = Object.keys(plantSchema);

    return schemaKeys.reduce((newPlant, key) => {
        switch (plantSchema[key]) {
            case SINGLE: {
                newPlant[key] = (plant[key] && plant[key].value) ? plant[key].value : ' ';
                break;
            }
            case MULTI: {
                newPlant[key] = (plant[key] && plant[key].length > 0) ? plant[key].map(option => { return option.value; }) : [];
                break;
            }
            case TAGS: {
                newPlant[key] = (plant[key] && Array.isArray(plant[key])) ? plant[key].reduce((result, item) => result.concat([{ name: item.name }]),[]) : [];
                break;
            }
            case STRING:
            default: {
                newPlant[key] = (plant[key]) ? plant[key] : ' ';
            }
        }
        return newPlant;
    }, {});
}

export const transformPlantForEditing = (plant, filtersObj) => {
    const plantKeys = Object.keys(plant);
    return plantKeys.reduce((newPlant, plantKey) => {
        if(filtersObj.hasOwnProperty(plantKey)){
            if(filtersObj[plantKey].multi) {
                newPlant[plantKey] = filtersObj[plantKey].options.filter(option => plant[plantKey].indexOf(option.value) >= 0);
            } else {
                newPlant[plantKey] = filtersObj[plantKey].options.find(option => plant[plantKey] === option.value);
            }
        } else {
            newPlant[plantKey] = plant[plantKey];
        }
        if(!newPlant.hasOwnProperty('areas')) newPlant.areas = [];
        if(!newPlant.hasOwnProperty('schedules')) newPlant.schedules = [];
        return newPlant;
    }, {});
}

export const transformPlantForViewing = (plant, filtersObj) => {
    const schemaKeys = Object.keys(schema);

    if(Object.keys(filtersObj).length > 0) { 
        return schemaKeys.reduce((newPlant, key) => {
            if(plant[key] === null || plant[key] === undefined || plant[key] === '' || plant[key] === ' ') {
                newPlant[key] = plant[key];
            } else {
                switch (schema[key]) {
                    case SINGLE:{
                        // Will either be a string (if straight from DB)
                        // Or an object, if it has just been saved (and no refresh)
                        let result = {};
                        if (typeof plant[key] === 'string'){
                            result = filtersObj[key].options.find(option => plant[key] === option.value);
                        } else {
                            result = filtersObj[key].options.find(option => plant[key].value === option.value);
                        }
                        newPlant[key] = (result && result.label) ? result.label : '';
                        break;
                    }
                    case TAGS: {
                        newPlant[key] = (plant[key] && Array.isArray(plant[key])) ? plant[key] : [];
                        break;
                    }
                    case MULTI: {
                        let result = [];
                        if(Array.isArray(plant[key]) && plant[key].length >0) {
                            result = plant[key].reduce((output, selection, index) => {
                                const matches = filtersObj[key].options.find(option => {
                                    if(typeof selection === 'string') {
                                        return selection === option.value;
                                    } else {
                                        return selection.value === option.value;
                                    }
                                });
                                output += ((index > 0) ? ' / ' : '') + ((matches) ? matches.label : selection.toUpperCase());
                                return output;
                            }, '');
                        }
                        newPlant[key] = result;
                        break;
                    }
                    case STRING:
                    default: {
                        newPlant[key] = (plant[key]) ? plant[key] : ' ';
                    }
                }
            }
            return newPlant;
        }, {});
    } else {
        return {
            id: plant.id,
            loading: true
        };
    }
}