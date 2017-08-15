# fhir-converter

A javascript FHIR (www.hl7.org/fhir/) converter that transforms data from known (and custom) formats into FHIR data.

## Usage

### Node

```javascript
var fhir = require('fhir-converter');

//Creating a converter from Fitbit to FHIR
var converter = new fhir('fitbit');

// Your resource to convert
var sleepLog = {
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
        }
    ],
    "summary": {
        "totalMinutesAsleep": 0,
        "totalSleepRecords": 2,
        "totalTimeInBed": 0
    }
};

// Run the converter on the resource
result = converter.convert(sleepLog);

// The result is a FHIR bundle containing sleep observations
console.log(result);

```

