var util = require('../../utilities.js');

exports.map = function (sleepLogs) {
  var result = util.createBundle(getSleepResources(sleepLogs));
  return result;
}

var getSleepResources = function (sleepLogs) {
    var observations = [];
    sleepLogs.forEach(function(sleepLog) {
      if (sleepLog.type == "stages") {
        observations.push(createSleepDiagnosticReport(sleepLog));
        observations.push(createSleepObservation('lightsleep', sleepLog.levels.summary.light.count, sleepLog.levels.summary.light.minutes));
        observations.push(createSleepObservation('wakesleep', sleepLog.levels.summary.wake.count, sleepLog.levels.summary.wake.minutes));
        observations.push(createSleepObservation('remsleep', sleepLog.levels.summary.rem.count, sleepLog.levels.summary.rem.minutes));
        observations.push(createSleepObservation('deepsleep', sleepLog.levels.summary.deep.count, sleepLog.levels.summary.deep.minutes));
        observations.push(createSleepDurationObservation(sleepLog.duration));
      }
    });
    return observations;
}

// var createSleepBundle = function (sleepLog) {
//   var result = {
//     resourceType: "Bundle",
//     type: "transaction",
//     meta: {"lastUpdated": "2017-08-03T16:12:06.994Z"},
//     entry: getSleepBundleEntries(sleepLog)
//   }
//   return result;
// }

var getSleepBundleEntries = function (sleepLog) {
  var entries = [];
  entries.push(createSleepDiagnosticReport(sleepLog));
  entries.push(createSleepObservation('lightsleep', sleepLog.levels.summary.light.count, sleepLog.levels.summary.light.minutes));
  entries.push(createSleepObservation('wakesleep', sleepLog.levels.summary.wake.count, sleepLog.levels.summary.wake.minutes));
  entries.push(createSleepObservation('remsleep', sleepLog.levels.summary.rem.count, sleepLog.levels.summary.rem.minutes));
  entries.push(createSleepObservation('deepsleep', sleepLog.levels.summary.deep.count, sleepLog.levels.summary.deep.minutes));
  entries.push(createSleepDurationObservation(sleepLog.duration));
  return entries;
}

var createSleepDiagnosticReport = function (sleepLog) {
  result = {
    fullUrl: 'DiagnosticReport/Sleep-logs',
    request: {
      method: "PUT",
      url: "DiagnosticReport/Sleep-logs"
    },
    resource: {
      resourceType: "DiagnosticReport",
      id: "Sleep-logs",
      status: "final",
      extension: [
        {
          url: "isMainSleep",
          valueBoolean: sleepLog.isMainSleep
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
      effectiveDateTime: sleepLog.dateOfSleep,
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
    }
  }
  return result;
}

var createSleepObservation = function (typeOfSleep, count, minutes) {
  var result = 
    {
      fullUrl: "Observation/"+typeOfSleep, 
      request: {
        method: "PUT",
        url: "Observation/"+typeOfSleep
      },
      resource: {
        resourceType: "Observation",
        id: typeOfSleep,
        status: "final",
        code: {
          coding: [
            {
              code: "Sleep",
              display: "Sleep logs"
            }
          ]
        },
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
    }
  return result;
}

var createSleepDurationObservation = function (duration) {
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
  }
  return result;
}
