const assert = require('chai').assert;
const fhir_converter = require('../../lib/fhir-converter.js');

// Results
converter = new fhir_converter('fitbit');
fitbitMap = require('../../lib/platforms/fitbit/config.js');
fatData = {
	fat : [
        {
            "date":"2012-03-05",
            "fat":14,
            "logId":1330991999000,
            "time":"23:59:59",
            "source": "API"
        }
    ]
};

convertedFhirFatData = {
	resourceType: 'Bundle',
	type: 'transaction',
	meta: {"lastUpdated": "2017-08-03T16:12:06.994Z"},
	entry:[
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
  	]
};

convertedData = converter.convert(fatData);
//console.log(convertedData);

describe('fhir-converter', function(){

	describe('conf', function(){
		it('conf should be ', function(){
			assert.equal(converter.conf, fitbitMap);
		});
	});

	describe('convert()', function(){
		it('convert() should return a FHIR object', function(){
			assert.deepEqual(convertedData, convertedFhirFatData);
		});
	});

});
