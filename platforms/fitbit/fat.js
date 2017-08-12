var util = require('../../utilities.js');

exports.map = function (fatLogs) {
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
