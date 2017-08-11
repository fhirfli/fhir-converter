var m = require('./fitbit_map.js');

var fhir = require('fhir-validator'),
    resource,
    result;

var fs = require('fs');



var sleepLog ={
    "sleep": [
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
        },
        {
            "dateOfSleep": "2017-04-02",
            "duration": 0,
            "efficiency": 0,
            "isMainSleep": false,
            "levels": {
                "data": [
                    {
                        "dateTime": "2017-04-02T12:06:00.000",
                        "level": "asleep",
                        "seconds": 0
                    },
                    {
                        "dateTime": "2017-04-02T12:13:00.000",
                        "level": "restless",
                        "seconds": 0
                    },
                    {
                        "dateTime": "2017-04-02T12:14:00.000",
                        "level": "awake",
                        "seconds": 0
                    }
                ],
                "summary": {
                    "asleep": {
                        "count": 0, // this field should not be used for "asleep" summary info
                        "minutes": 0
                    },
                    "awake": {
                        "count": 0,
                        "minutes": 0
                    },
                    "restless": {
                        "count": 0,
                        "minutes": 0
                    }
                }
            },
            "logId": 0,
            "minutesAfterWakeup": 0,
            "minutesAsleep": 0,
            "minutesAwake": 0,
            "minutesToFallAsleep": 0, // this is generally 0 for autosleep created sleep logs
            "startTime": "2017-04-02T12:06:00.000",
            "timeInBed": 0,
            "type": "classic"
        }
    ],
    "summary": {
        "totalMinutesAsleep": 0,
        "totalSleepRecords": 2,
        "totalTimeInBed": 0
    }
};


var obj = {
    DATE: '20160512',
    TIME: '140000',
    FIRST_NAME: 'John',
    LAST_NAME: 'Doe',
    ID: 'EMP000210290'
};


var fitbitWeightlog = {
    "weightLog": [
        {
            "bmi": 23.57,
            "date": "2012-03-05",
            "logId": 1330991999000,
            "time": "23:59:59",
            "weight": 73,
            "source": "API"
        }
    ]
};



var fitbitData ={
    "activities-heart": [
        {
            "dateTime": "2015-08-04",
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
    ]
};


var check = {
   "resourceType": "Bundle",
   "type": "transaction",
   "meta": {
      "lastUpdated": "2017-08-07T15:44:59.478Z",
      "fhir_comments": [
         "Generated by FRED"
      ]
   },
   "entry": [
      {
         "fullUrl": "DiagnosticReport/Sleep-logs",
         "request": {
            "method": "PUT",
            "url": "DiagnosticReport/Sleep-logs"
         },
         "resource": {
            "resourceType": "DiagnosticReport",
            "id": "Sleep-logs",
            "extension": [
               {
                  "url": "isMainSleep",
                  "valueBoolean": true
               }
            ],
            "code": {
               "coding": [
                  {
                     "code": "Sleep",
                     "display": "Sleep logs"
                  }
               ]
            },
            "subject": {
               "reference": "Patient/example"
            },
            "effectiveDateTime": "1997-07-16T19:20:30+01:00",
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
         "fullUrl": "Observation/lightsleep",
         "request": {
            "method": "PUT",
            "url": "Observation/lightsleep"
         },
         "resource": {
            "resourceType": "Observation",
            "id": "lightsleep",
            "component": [
               {
                  "code": {
                     "coding": [
                        {
                           "code": "count",
                           "display": "Count"
                        }
                     ]
                  },
                  "valueQuantity": {
                     "value": "3474.0"
                  }
               },
               {
                  "code": {
                     "coding": [
                        {
                           "code": "minutes",
                           "display": "Minutes"
                        }
                     ]
                  },
                  "valueQuantity": {
                     "value": "345.0",
                     "unit": "minutes",
                     "system": "http://unitsofmeasure.org"
                  }
               }
            ]
         }
      },
      {
         "fullUrl": "Observation/wakesleep",
         "request": {
            "method": "PUT",
            "url": "Observation/wakesleep"
         },
         "resource": {
            "resourceType": "Observation",
            "id": "wakesleep",
            "component": [
               {
                  "code": {
                     "coding": [
                        {
                           "code": "count",
                           "display": "Count"
                        }
                     ]
                  },
                  "valueQuantity": {
                     "value": "3474.0"
                  }
               },
               {
                  "code": {
                     "coding": [
                        {
                           "code": "minutes",
                           "display": "Minutes"
                        }
                     ]
                  },
                  "valueQuantity": {
                     "value": "345.0",
                     "unit": "minutes",
                     "system": "http://unitsofmeasure.org"
                  }
               }
            ]
         }
      },
      {
         "fullUrl": "Observation/remsleep",
         "request": {
            "method": "PUT",
            "url": "Observation/remsleep"
         },
         "resource": {
            "resourceType": "Observation",
            "id": "remsleep",
            "component": [
               {
                  "code": {
                     "coding": [
                        {
                           "code": "count",
                           "display": "Count"
                        }
                     ]
                  },
                  "valueQuantity": {
                     "value": "3474.0"
                  }
               },
               {
                  "code": {
                     "coding": [
                        {
                           "code": "minutes",
                           "display": "Minutes"
                        }
                     ]
                  },
                  "valueQuantity": {
                     "value": "345.0",
                     "unit": "minutes",
                     "system": "http://unitsofmeasure.org"
                  }
               }
            ]
         }
      },
      {
         "fullUrl": "Observation/deepsleep",
         "request": {
            "method": "PUT",
            "url": "Observation/deepsleep"
         },
         "resource": {
            "resourceType": "Observation",
            "id": "deepsleep",
            "component": [
               {
                  "code": {
                     "coding": [
                        {
                           "code": "count",
                           "display": "Count"
                        }
                     ]
                  },
                  "valueQuantity": {
                     "value": "3474.0"
                  }
               },
               {
                  "code": {
                     "coding": [
                        {
                           "code": "minutes",
                           "display": "Minutes"
                        }
                     ]
                  },
                  "valueQuantity": {
                     "value": "345.0",
                     "unit": "minutes",
                     "system": "http://unitsofmeasure.org"
                  }
               }
            ]
         }
      },
      {
         "fullUrl": "Observation/sleepduration",
         "request": {
            "method": "PUT",
            "url": "Observation/sleepduration"
         },
         "resource": {
            "resourceType": "Observation",
            "id": "sleepduration",
            "status": "final",
            "code": {
               "coding": [
                  {
                     "system": "http://snomed.info/sct",
                     "code": "248263006",
                     "display": "Duration of sleep"
                  }
               ]
            },
            "valueQuantity": {
               "value": "3456673245.0",
               "unit": "milliseconds",
               "system": "http://unitsofmeasure.org"
            }
         }
      }
   ]
};

var fitbitFat = {
    "fat":[
        {
            "date":"2012-03-05",
            "fat":14,
            "logId":1330991999000,
            "time":"23:59:59",
            "source": "API"
        },
        {
            "date":"2012-03-05",
            "fat":13.5,
            "logId":1330991999000,
            "time":"21:20:59",
            "source":"Aria"
        }
    ]
}; 


var mapped = m.map_existing_keys(fitbitFat);

console.log(mapped);


result = fhir.validate(mapped);


console.log(result.errors);


fs.writeFile("example.json", JSON.stringify(mapped), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
