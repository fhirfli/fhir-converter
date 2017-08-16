var util = require('../../utilities.js');
var fat = require('./fat.js');

exports.mapWeightLog = function (weightLogs) {
  	var result = util.createBundle(getWeightLogResources(weightLogs));
  	return result;
}

var getWeightLogResources = function (weightLogs) {
  if (Array.isArray(weightLogs)) {
  	return getMultipleWeightLogResources(weightLogs);
  }
  return getSingleWeightLogResource(weightLogs);
}

var getMultipleWeightLogResources = function (weightLogs) {
	var observations = [];
  	weightLogs.forEach(function(weightLog) {
    	observations.push(fat.createFatObservation(weightLog));
  	});
  	return observations;
}

var getSingleWeightLogResource = function (weightLog) {
	var observations = [];
  	observations.push(createBmiObservation(weightLog));
  	observations.push(fat.createFatObservation(weightLog));
  	return observations;
}

exports.mapWeight = function (weightLogs) {
	var result = util.createBundle(getWeightResources(weightLogs));
  	return result;
}

var getWeightResources = function (weightLogs) {
	var observations = [];
  	weightLogs.forEach(function(weightLog) {
    	observations.push(createBmiObservation(weightLog));
    	observations.push(createWeight(weightLog));
  	});
  	return observations;
}

var createBmiObservation = function (weightLog) {
	var result = {
		fullUrl: "urn:uuid:13723207-8864-4465-9840-ff4b522146b2",
    	request: {
      		method: "POST",
      		url: "Observation"
    	},
    	request: {
      		method: "POST",
      		url: "Observation"
    	},
		resource: {
  			resourceType: "Observation",
  			id: "bmi",
  			meta: {
    			profile: [
      				"http://hl7.org/fhir/StructureDefinition/vitalsigns"
    			]
  			},
  			status: "final",
  			issued: weightLog.date,
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
  			subject: {
    			reference: "Patient/example"
  			},
  			effectiveDateTime: weightLog.date,
  			valueQuantity: {
    			value: weightLog.bmi,
    			unit: "kg/m2",
    			system: "http://unitsofmeasure.org",
    			code: "bmi"
  			}
		}
	}
	return result;
}

var createWeight = function (weightLog) {
	var result = {
		fullUrl: "urn:uuid:13723207-8864-4465-9840-ff4b522146b3",
    	request: {
      		method: "POST",
      		url: "Observation"
    	},
    	request: {
      		method: "POST",
      		url: "Observation"
    	},
		resource: {
			resourceType: "Observation",
  			id: "weight",
  			meta: {
    		profile: [
      			"http://hl7.org/fhir/StructureDefinition/vitalsigns"
    		]
  			},
  			status: "final",
  			issued: weightLog.date,
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
        				code: "29463-7",
        				display: "Body weight"
      				}, 
    				{
        				system: "http://snomed.info/sct",
        				code: "27113001",
        				display: "Body weight"
      				}   
 				]
  			},
  			subject: {
    			reference: "Patient/example"
  			},
  			effectiveDateTime: weightLog.date,
  			valueQuantity: {
    			value: weightLog.weight,
    			unit: "kg",
    			system: "http://unitsofmeasure.org",
    			code: "weight"
  			}
		}
	}
	return result;
}
