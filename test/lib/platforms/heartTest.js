const assert = require('chai').assert;
const heart = require('../../../lib/platforms/fitbit/heart.js');

// Results

heartData = [
        {
            "customHeartRateZones": [],
            "dateTime": '2012-03-05',
            "heartRateZones": [
                {
                    "caloriesOut": 2.3246,
                    "max": 94,
                    "min": 30,
                    "minutes": 2,
                    "name": "Out of Range"
                },
                {
                    "caloriesOut": 0,
                    "max": 132,
                    "min": 94,
                    "minutes": 0,
                    "name": "Fat Burn"
                },
                {
                    "caloriesOut": 0,
                    "max": 160,
                    "min": 132,
                    "minutes": 0,
                    "name": "Cardio"
                },
                {
                    "caloriesOut": 0,
                    "max": 220,
                    "min": 160,
                    "minutes": 0,
                    "name": "Peak"
                }
            ],
            "value": "64.2"
        }
    ];

heartData2 = [
        {
            "dateTime": "today",
            "value": {
                "customHeartRateZones": [],
                "heartRateZones": [
                    {
                        "caloriesOut": 740.15264,
                        "max": 94,
                        "min": 30,
                        "minutes": 593,
                        "name": "Out of Range"
                    },
                    {
                        "caloriesOut": 249.66204,
                        "max": 132,
                        "min": 94,
                        "minutes": 46,
                        "name": "Fat Burn"
                    },
                    {
                        "caloriesOut": 0,
                        "max": 160,
                        "min": 132,
                        "minutes": 0,
                        "name": "Cardio"
                    },
                    {
                        "caloriesOut": 0,
                        "max": 220,
                        "min": 160,
                        "minutes": 0,
                        "name": "Peak"
                    }
                ],
                "restingHeartRate": 68
            }
        }
    ];

fhirHeartData = ['Bundle', 'transaction', {"lastUpdated": "2017-08-03T16:12:06.994Z"}, [{
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
      id: "heart-rate",
      meta: {
        profile: [
          "http://hl7.org/fhir/StructureDefinition/vitalsigns"
        ]
      },
      status: "final",
      issued: '2012-03-05',
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
      effectiveDateTime: '2012-03-05',
      valueQuantity: {
        value: 64.2,
        unit: "beats/minute",
        system: "http://unitsofmeasure.org",
        code: "/min"
      }
    }
  }]];


fhirHeartData2 = ['Bundle', 'transaction', {"lastUpdated": "2017-08-03T16:12:06.994Z"}, [{
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
      id: "heart-rate",
      meta: {
        profile: [
          "http://hl7.org/fhir/StructureDefinition/vitalsigns"
        ]
      },
      status: "final",
      issued: '2017-08-03',
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
      effectiveDateTime: '2017-08-10',
      valueQuantity: {
        value: 68,
        unit: "beats/minute",
        system: "http://unitsofmeasure.org",
        code: "/min"
      }
    }
  }]];



result1 = heart.map(heartData);

result2 = heart.map(heartData2);


describe('heart', function(){

	describe('map', function(){
		it('map should return a FHIR  object', function(){
			assert.deepEqual(result1, fhirHeartData);
		});
	});

  describe('map2', function(){
    it('map should return a FHIR  object', function(){
      assert.deepEqual(result2, fhirHeartData2);
    });
  });

});


