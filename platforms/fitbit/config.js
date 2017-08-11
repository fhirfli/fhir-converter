var DMM = require('data-model-mapper-plus');
var util = require('../../utilities.js');
var fat = require('./fat.js');

var conf = [
    // {
    //     dest: util.observation,
    //     src: 'activities-heart',
    //     map: mapHeartActivity
    // },
    // {
    //     dest: util.observation,
    //     src: 'weightLog',
    //     map: mapWeightLog
    // },
    // {
    //     dest: util.bundle,
    //     src: 'sleep',
    //     map: mapSleep
    // },
    {
        dest: util.bundle,
        src: 'fat',
        map: fat.map
    }

];

var m = new DMM(conf);

module.exports = m;
