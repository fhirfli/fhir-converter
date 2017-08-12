var util = require('../../utilities.js');

exports.map = function (heartLogs) {
  var result =  util.createBundle(getHeartResources(heartLogs));
  return result;
}

var getHeartResources = function (heartLogs) {
    var observations = [];
    heartLogs.forEach(function(heartLog) {
        observations.push(createHeartObservation(heartLog));
    });
    return observations;
}

var createHeartObservation = function (heartLog) {
  var result = {
    resourceType: "Observation",
    id: "heart-rate",
    meta: {
      profile: [
        "http://hl7.org/fhir/StructureDefinition/vitalsigns"
      ]
    },
    status: "final",
    issued: heartLog.dateTime,
    category: [
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
    code: {
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
    subject: {
      reference: "Patient/example"
    },
    effectiveDateTime: heartLog.dateTime,
    valueQuantity: {
      value: heartLog.value.hasOwnProperty('restingHeartRate')?heartLog.value.restingHeartRate:heartLog.value,
      unit: "beats/minute",
      system: "http://unitsofmeasure.org",
      code: "/min"
    }
  };
  return result;
}
