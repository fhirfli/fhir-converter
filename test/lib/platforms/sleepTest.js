const assert = require('chai').assert;
const sleep = require('../../../lib/platforms/fitbit/sleep.js');

// Input Data
sleepData = [
        {
            "dateOfSleep": "2017-04-02",
            "duration": 300,
            "efficiency": 10,
            "isMainSleep": true,
            "levels": {
                "summary": {
                    "deep": {
                        "count": 1,
                        "minutes": 11,
                        "thirtyDayAvgMinutes": 111
                    },
                    "light": {
                        "count": 2,
                        "minutes": 22,
                        "thirtyDayAvgMinutes": 222
                    },
                    "rem": {
                        "count": 3,
                        "minutes": 33,
                        "thirtyDayAvgMinutes": 333
                    },
                    "wake": {
                        "count": 4,
                        "minutes": 44,
                        "thirtyDayAvgMinutes": 444
                    }
                },
                "data": [
                    {
                        "datetime": "2017-04-01T23:58:30.000",
                        "level": "wake",
                        "seconds": 0
                    },
                    {
                        "datetime": "2017-04-02T00:16:30.000",
                        "level": "rem",
                        "seconds": 0
                    }
                ],
                "shortData": [
                    {
                        "datetime": "2017-04-02T05:58:30.000",
                        "level": "wake",
                        "seconds": 0
                    }
                ]
            },
            "logId": 0,
            "minutesAfterWakeup": 0,
            "minutesAsleep": 0,
            "minutesAwake": 0,
            "minutesToFallAsleep": 0, // this is generally 0 for autosleep created sleep logs
            "startTime": "2017-04-01T23:58:30.000",
            "timeInBed": 0,
            "type": "stages"
        }
    ];

// Expected Data
fhirSleepData = ['Bundle', 'transaction', {"lastUpdated": "2017-08-03T16:12:06.994Z"}, [{
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
          valueBoolean: true
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
      effectiveDateTime: "2017-04-02",
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
  },
  {
      fullUrl: "Observation/"+'lightsleep', 
      request: {
        method: "PUT",
        url: "Observation/"+'lightsleep'
      },
      resource: {
        resourceType: "Observation",
        id: 'lightsleep',
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
              value: 2
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
              value: 22,
              unit: "minutes",
              system: "http://unitsofmeasure.org"
            }
          }
        ]
      }
    },
    {
      fullUrl: "Observation/"+'wakesleep', 
      request: {
        method: "PUT",
        url: "Observation/"+'wakesleep'
      },
      resource: {
        resourceType: "Observation",
        id: 'wakesleep',
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
              value: 4
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
              value: 44,
              unit: "minutes",
              system: "http://unitsofmeasure.org"
            }
          }
        ]
      }
    },
    {
      fullUrl: "Observation/"+'remsleep', 
      request: {
        method: "PUT",
        url: "Observation/"+'remsleep'
      },
      resource: {
        resourceType: "Observation",
        id: 'remsleep',
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
              value: 3
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
              value: 33,
              unit: "minutes",
              system: "http://unitsofmeasure.org"
            }
          }
        ]
      }
    },
    {
      fullUrl: "Observation/"+'deepsleep', 
      request: {
        method: "PUT",
        url: "Observation/"+'deepsleep'
      },
      resource: {
        resourceType: "Observation",
        id: 'deepsleep',
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
              value: 1
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
              value: 11,
              unit: "minutes",
              system: "http://unitsofmeasure.org"
            }
          }
        ]
      }
    },
    {
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
        value: 300,
        unit: "milliseconds",
        system: "http://unitsofmeasure.org"
      }
    }
  }
  ]
];

// Results
convertedSleepData = sleep.map(sleepData);

// Tests
describe('sleep', function(){
	describe('map()', function(){
		it('map() should return a valid FHIR Bundle of sleep Observartions and a Diagnostic Report', function(){
			assert.deepEqual(convertedSleepData, fhirSleepData);
		});
	});
});
