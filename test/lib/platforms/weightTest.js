const assert = require('chai').assert;
const weight = require('../../../lib/platforms/fitbit/weight.js');

// Results

weightData = [
        {
            "bmi":23.57,
            "date":"2015-03-05",
            "logId":1330991999000,
            "time":"23:59:59",
            "weight":73,
            "source": "API"
        }
    ];

fhirWeightData = ['Bundle', 'transaction', {"lastUpdated": "2017-08-03T16:12:06.994Z"}, [{
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
  			issued: "2015-03-05",
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
  			effectiveDateTime: "2015-03-05",
  			valueQuantity: {
    			value: 23.57,
    			unit: "kg/m2",
    			system: "http://unitsofmeasure.org",
    			code: "bmi"
  			}
		}
	},
	{
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
  			issued: "2015-03-05",
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
  			effectiveDateTime: "2015-03-05",
  			valueQuantity: {
    			value: 73,
    			unit: "kg",
    			system: "http://unitsofmeasure.org",
    			code: "weight"
  			}
		}
	}
]];

convertedWeightData = weight.mapWeight(weightData);

describe('weight', function(){
	describe('map', function(){
		it('map should return a FHIR  object', function(){
			assert.deepEqual(convertedWeightData, fhirWeightData);
		});
	});
});



