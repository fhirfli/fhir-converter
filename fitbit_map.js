var DMM = require('data-model-mapper');
var util = require('utilities.js');

var mapHeartActivity = function (activities_heart) {
    return ['Observation', 'heart-rate', 
    { profile: ["http://hl7.org/fhir/StructureDefinition/vitalsigns"] },
    'final', activities_heart[0].dateTime+'T00:00:00.000', 
    [
    {
      coding: [
        {
          system: "http://hl7.org/fhir/observation-category",
          code: "fitness",
          display: "Fitness data"
        }
      ],
      text: "Fitness data"
    }
  ],
   {
    coding: [
      {
        system: "http://loinc.org",
        code: "8867-4",
        display: "Heart Rate"
      },
    {
        system: "http://snomed.info/sct",
        code: "364075005",
        display: "Heart Rate"
      }   
 ]
  }, 
    '1999-07-02',
    {
    "reference": "Patient/example"
  }, 
    {
        value: 44,
        unit: 'beats/minute',
        system: 'http://unitsofmeasure.org',
        code: '/min'
    }
    ];
}

var mapWeightLog = function (weightLog) {
    return ['Observation', 'heart-rate', 
    { profile: ["http://hl7.org/fhir/StructureDefinition/vitalsigns"] },
    'final', weightLog[0].date+'T'+weightLog[0].time, 
    [
    {
      coding: [
        {
          system: "http://hl7.org/fhir/observation-category",
          code: "fitness",
          display: "Fitness data"
        }
      ],
      text: "Fitness data"
    }
  ],
   {
    coding: [
      {
        system: "http://loinc.org",
        code: "59574-4",
        display: "BMI"
      },
    {
        system: "http://snomed.info/sct",
        code: "60621009",
        display: "BMI"
      }   
 ]
  },
  {
    "reference": "Patient/example"
  }, 
    '1999-07-02', 
    {
        value: weightLog[0].bmi,
        unit: 'kg/m2',
        system: 'http://unitsofmeasure.org',
        code: 'bmi'
    }
    ];
}

// Sleep functions

var resourceSleepReference = function (sleep) {

    return {fullUrl: 'DiagnosticReport/Sleep-logs', request: {method: "PUT", url: "DiagnosticReport/Sleep-logs"},
resource: {
            resourceType: "DiagnosticReport",
            id: "Sleep-logs",
            extension: [
               {
                  url: "isMainSleep",
                  valueBoolean: sleep[0].isMainSleep
               }
            ],
            code: {
               coding: [
                  {
                     code: "Sleep",
                     display: "Sleep logs"
                  }
               ]
            },
            subject: {
               "reference": "Patient/example"
            },
            effectiveDateTime: sleep[0].dateOfSleep,
            "result": [
               {
                  "reference": "Observation/sleepduration"
               },
               {
                  "reference": "Observation/lightsleep"
               },
               {
                  "reference": "Observation/deepsleep"
               },
               {
                  "reference": "Observation/remsleep"
               },
               {
                  "reference": "Observation/wakesleep"
               }
            ]
         }};
}

var resourceSleep = function (type_of_sleep, count, minutes) {
    var result = 
       {
        fullUrl: "Observation/"+type_of_sleep, 
        request: {
            method: "PUT",
            url: "Observation/"+type_of_sleep
        },
         resource: {
            resourceType: "Observation",
            id: type_of_sleep,
            component: [
               {
                  code: {
                     coding: [
                        {
                           code: "count",
                           display: "Count"
                        }
                     ]
                  },
                  valueQuantity: {
                     value: count
                  }
               },
               {
                  code: {
                     coding: [
                        {
                           code: "minutes",
                           display: "Minutes"
                        }
                     ]
                  },
                  valueQuantity: {
                     value: minutes,
                     unit: "minutes",
                     system: "http://unitsofmeasure.org"
                  }
               }
            ]
         }
     };
    return result;
}

var resourceSleepDuration = function (duration) {
    var result = {
         fullUrl: "Observation/sleepduration",
         request: {
            method: "PUT",
            url: "Observation/sleepduration"
         },
         resource: {
            resourceType: "Observation",
            id: "sleepduration",
            status: "final",
            code: {
               coding: [
                  {
                     system: "http://snomed.info/sct",
                     code: "248263006",
                     display: "Duration of sleep"
                  }
               ]
            },
            valueQuantity: {
               value: duration,
               unit: "milliseconds",
               system: "http://unitsofmeasure.org"
            }
         }
      };
    return result;
}

var mapSleep = function (sleepLogs) {
    return ['Bundle', 'transaction', 
    {"lastUpdated": "2017-08-07T15:44:59.478Z"}, 
    getSleepResources(sleepLogs)


    [ resourceSleepReference(sleep),
    resourceSleep('lightsleep', sleep[0].levels.summary.light.count, sleep[0].levels.summary.light.minutes),
    resourceSleep('wakesleep', sleep[0].levels.summary.wake.count, sleep[0].levels.summary.wake.minutes),
    resourceSleep('remsleep', sleep[0].levels.summary.rem.count, sleep[0].levels.summary.rem.minutes),
    resourceSleep('deepsleep', sleep[0].levels.summary.deep.count, sleep[0].levels.summary.deep.minutes),
    resourceSleepDuration(sleep[0].duration)]


    ];
}

var getSleepResources = function (sleepLogs) {
    var diagnosticReports = [];
    sleepLogs.forEach(function(sleepLog) {
        diagnosticReports.push(createSleepDiagnosticReport(sleepLog));
    });
    return diagnosticReports;
}

var createSleepDiagnosticReport = function (sleepLog) {
    var result = 
}

// Fat functions

var mapFat = function (fatLogs) {
    var result = util.createBundle(getFatResources(fatLogs));
    return result;
}

var getFatResources = function (fatLogs) {
    var observations = [];
    fatLogs.forEach(function(fatLog) {
        observations.push(createFatObservation(fatLog));
    });
    return observations;
}

var createFatObservation = function (fatLog) {
    var result = {
        //fullUrl: "urn:uuid:13723207-8864-4465-9840-ff4b522146b3",
         request: {
            method: "POST",
            url: "Observation"
         },
         resource: {
            resourceType: "Observation",
            status: "final",
            code: {
               coding: [
                  {
                     system: "http://loinc.org",
                     code: "41982-0",
                     display: "Body fat percentage"
                  }
               ],
               text: "Body fat"
            },
            subject: {
               reference: "Patient/example"
            },
            effectiveDateTime: fatLog.date,
            valueQuantity: {
               value: fatLog.fat,
               unit: "percentage",
               system: "http://unitsofmeasure.org"
            }
         }
    }
    return result;
}
 
var conf = [
    {
        dest: util.observation,
        src: 'activities-heart',
        map: mapHeartActivity
    },
    {
        dest: util.observation,
        src: 'weightLog',
        map: mapWeightLog
    },
    {
        dest: util.bundle,
        src: 'sleep',
        map: mapSleep
    },
    {
        dest: util.bundle,
        src: 'fat',
        map: mapFat
    }

];



var m = new DMM(conf);

module.exports = m;