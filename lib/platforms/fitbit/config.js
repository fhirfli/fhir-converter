const DMM = require('data-model-mapper-plus');
const util = require('../../utilities.js');
const fat = require('./fat.js');
const sleep = require('./sleep.js');
const heart = require('./heart.js');
const weight = require('./weight.js')

// Mapping from Fitbit attributes to FHIR resources 
var conf = [
    {
        dest: util.bundle,
        src: 'activities-heart',
        map: heart.map
    },
    {
        dest: util.bundle,
        src: 'weightLog',
        map: weight.mapWeightLog
    },
    {
        dest: util.bundle,
        src: 'weight',
        map: weight.mapWeight
    },
    {
        dest: util.bundle,
        src: 'sleep',
        map: sleep.map
    },
    {
        dest: util.bundle,
        src: 'fat',
        map: fat.map
    }

];

var mapping = new DMM(conf);

module.exports = mapping;
