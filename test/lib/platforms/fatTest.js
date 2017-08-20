const assert = require('chai').assert;
const fat = require('../../../lib/platforms/fitbit/fat.js');

// Results

fatData = [
        {
            "date":"2012-03-05",
            "fat":14,
            "logId":1330991999000,
            "time":"23:59:59",
            "source": "API"
        }
    ];

fhirFatData = ['Bundle', 'transaction', {"lastUpdated": "2017-08-03T16:12:06.994Z"}, [
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
      			effectiveDateTime: "2012-03-05",
      			valueQuantity: {
        			value: 14,
        			unit: "percentage",
        			system: "http://unitsofmeasure.org"
      			}
    		}
  		}
  	]];


convertedFatData = fat.map(fatData);

describe('fat', function(){
	describe('map', function(){
		it('map should return a FHIR  object', function(){
			assert.deepEqual(convertedFatData, fhirFatData);
		});
	});
});
