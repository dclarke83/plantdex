import { 
    transformPlantForSaving, 
    transformPlantForEditing, 
    transformPlantForViewing,
    SINGLE,
    STRING,
    MULTI,
    TAGS 
} from './plant-helpers';

describe('transformPlantForSaving', () => {

    it('should be defined', () => {
        expect(transformPlantForSaving).toBeDefined();
    });

    describe('SINGLE value transformation', () => {
        it('the value property will be returned as a string', () => {
            //Arrange
            const plantSchema = {
                testSingle: SINGLE
            };
            const plant = {
                testSingle: {
                    name: 'test name',
                    value: 'test value'
                }
            };
    
            //Act
            const result = transformPlantForSaving(plant, plantSchema);
    
            //Assert
            expect(result.testSingle).toBe(plant.testSingle.value);
        });
    
        it('a missing schema property will be returned as a string', () => {
            //Arrange
            const plantSchema = {
                testSingle: SINGLE
            };
            const plant = {
            };
    
            //Act
            const result = transformPlantForSaving(plant, plantSchema);
    
            //Assert
            expect(result.testSingle).toBe(' ');
        });

        it('a missing value property will be returned as a string', () => {
            //Arrange
            const plantSchema = {
                testSingle: SINGLE
            };
            const plant = {
                testSingle: {
                    name: 'test'
                }
            };
    
            //Act
            const result = transformPlantForSaving(plant, plantSchema);
    
            //Assert
            expect(result.testSingle).toBe(' ');
        });        
    });

    describe('TAGS value transformation', () => {
        it('if the plant has tags and tags is an array, use it', () => {
            //Arrange
            const plantSchema = {
                testTags: TAGS
            };
            const plant = {
                testTags: []
            };

            //Act
            const result = transformPlantForSaving(plant, plantSchema);

            //Assert
            expect(result.testTags).toEqual(plant.testTags);
        });

        it('if the plant doesn`t have tags, return an empty array', () => {
            //Arrange
            const plantSchema = {
                testTags: TAGS
            };
            const plant = {
            };

            //Act
            const result = transformPlantForSaving(plant, plantSchema);

            //Assert
            expect(result.testTags).toEqual([]);            
        });

        it('if the plant`s tags property is not an array, return an empty array', () => {
            //Arrange
            const plantSchema = {
                testTags: TAGS
            };
            const plant = {
                testTags: {}
            };

            //Act
            const result = transformPlantForSaving(plant, plantSchema);

            //Assert
            expect(result.testTags).toEqual([]);            
        }); 
        
        it('should return an array with the correct number of elements', () => {
            //Arrange
            const plantSchema = {
                testTags: TAGS
            };
            const plant = {
                testTags:[
                    { name: 'hello' },
                    { name: 'bob' }
                ]
            };

            //Act
            const result = transformPlantForSaving(plant, plantSchema);

            //Assert
            expect(result.testTags.length).toBe(2);
        });

        it('should return an array of objects with only a name property', () => {
            //Arrange
            const plantSchema = {
                testTags: TAGS
            };
            const plant = {
                testTags:[
                    { name: 'hello', id: '123', something: [] },
                    { name: 'bob', id: 'abc', something: [ {id: 'blah'} ] }
                ]
            };
            const expected = [
                { name: 'hello' },
                { name: 'bob' }                
            ];

            //Act
            const result = transformPlantForSaving(plant, plantSchema);

            //Assert
            expect(result.testTags).toEqual(expected);            
        });
    });
});

describe('transformPlantForEditing', () => {

    it('should be defined', () => {
        expect(transformPlantForEditing).toBeDefined();
    });

});

describe('transformPlantForViewing', () => {

    it('should be defined', () => {
        expect(transformPlantForViewing).toBeDefined();
    });

});