var DMM = require('data-model-mapper-plus');
var util = require('../../utilities.js');
var fat = require('./fat.js');
var sleep = require('./sleep.js');
var heart = require('./heart.js');
var weight = require('./weight.js')

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
    }
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

var m = new DMM(conf);

module.exports = m;
