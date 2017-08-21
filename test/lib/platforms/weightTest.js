const assert = require('chai').assert;
const weight = require('../../../lib/platforms/fitbit/weight.js');

// Results

// Input Data
weightData = [
        {
            "bmi":23.5,
            "date":"2015-03-05",
            "logId":1330991999000,
            "time":"23:59:59",
            "weight":73,
            "source": "API"
        }
    ];

weightLogData = 
  {
        "bmi": 23.5,
        "date": "2012-03-05",
        "fat": 14.5,       
        "logId": 1330991999000,
        "time": "23:59:59",
        "source": "API"
    };

weightLogDataArray = [
  {
        "bmi": 23.5,
        "date": "2012-03-05",
        "fat": 14.5,       
        "logId": 1330991999000,
        "time": "23:59:59",
        "source": "API"
  }
];

// Expected Data
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
    			value: 23.5,
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

fhirWeightLogData = ['Bundle', 'transaction', {"lastUpdated": "2017-08-03T16:12:06.994Z"}, [
{
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
  			issued: "2012-03-05",
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
  			effectiveDateTime: "2012-03-05",
  			valueQuantity: {
    			value: 23.5,
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
        value: 14.5,
        unit: "percentage",
        system: "http://unitsofmeasure.org"
      }
    }
  }
	]];

fhirWeightLogDataArray = ['Bundle', 'transaction', {"lastUpdated": "2017-08-03T16:12:06.994Z"}, [
{
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
        issued: "2012-03-05",
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
        effectiveDateTime: "2012-03-05",
        valueQuantity: {
          value: 23.5,
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
        value: 14.5,
        unit: "percentage",
        system: "http://unitsofmeasure.org"
      }
    }
  }
  ]];

// Results
convertedWeightData = weight.mapWeight(weightData);
convertedWeightLogData = weight.mapWeightLog(weightLogData);
convertedWeightLogDataArray = weight.mapWeightLog(weightLogDataArray);

// Tests
describe('weight', function(){
	describe('mapWeight()', function(){
		it('mapWeight() should return a valid FHIR Bundle of bmi and weight Observartions', function(){
			assert.deepEqual(convertedWeightData, fhirWeightData);
		});
  });
	describe('mapWeightLog()', function(){
		it('mapWeightLog() should return a valid FHIR Bundle of bmi and fat Observartions', function(){
			assert.deepEqual(convertedWeightLogData, fhirWeightLogData);
		});
	});
  describe('mapWeightLog() for an Array input', function(){
    it('mapWeightLog() should return a valid FHIR Bundle of bmi and fat Observartions', function(){
      assert.deepEqual(convertedWeightLogDataArray, fhirWeightLogDataArray);
    });
  });
});



