var DMM = require('data-model-mapper-plus');
var util = require('../../utilities.js');
var fat = require('./fat.js');
var sleep = require('./sleep.js');
var heart = require('./heart.js');

var conf = [
    {
        dest: util.bundle,
        src: 'activities-heart',
        map: heart.map
    },
    // {
    //     dest: util.observation,
    //     src: 'weightLog',
    //     map: mapWeightLog
    // },
    // {
    //     dest: util.bundle,
    //     src: 'sleep',
    //     map: sleep.map
    // },
    {
        dest: util.bundle,
        src: 'fat',
        map: fat.map
    }

];

var m = new DMM(conf);

module.exports = m;
