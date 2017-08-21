# fhir-converter

A javascript FHIR (www.hl7.org/fhir/) converter that transforms data from known (and custom) formats into FHIR data.

*Currently it supports a mapping from Fitbit's fat, sleep, weight and heart rate logs to FHIR FLI (https://simplifier.net/FhirFli/~resources).*

## Usage

### Node

```javascript
var fhir = require('fhir-converter');

// Creating a converter from Fitbit to FHIR
var converter = new fhir('fitbit');

// Your resource to convert
var sleepLog = {
    "sleep": [
        {
            "dateOfSleep": "2017-04-02",
            "duration": <value in milliseconds>,
            "efficiency": <value>,
            "isMainSleep": <true|false>,
            "levels": {
                "summary": {
                    "deep": {
                        "count": <value>,
                        "minutes": <value>,
                        "thirtyDayAvgMinutes": <value>
                    },
                    "light": {
                        "count": <value>,
                        "minutes": <value>,
                        "thirtyDayAvgMinutes": <value>
                    },
                    "rem": {
                        "count": <value>,
                        "minutes": <value>,
                        "thirtyDayAvgMinutes": <value>
                    },
                    "wake": {
                        "count": <value>,
                        "minutes": <value>,
                        "thirtyDayAvgMinutes": <value>
                    }
                },
                "data": [
                    {
                        "datetime": "2017-04-01T23:58:30.000",
                        "level": "wake",
                        "seconds": <value>
                    },
                    {
                        "datetime": "2017-04-02T00:16:30.000",
                        "level": "rem",
                        "seconds": <value>
                    }
                ],
                "shortData": [
                    {
                        "datetime": "2017-04-02T05:58:30.000",
                        "level": "wake",
                        "seconds": <value>
                    }
                ]
            },
            "logId": <value>,
            "minutesAfterWakeup": <value>,
            "minutesAsleep": <value>,
            "minutesAwake": <value>,
            "minutesToFallAsleep": <value>, // this is generally 0 for autosleep created sleep logs
            "startTime": "2017-04-01T23:58:30.000",
            "timeInBed": <value in minutes>,
            "type": "stages"
        }
    ],
    "summary": {
        "totalMinutesAsleep": <value>,
        "totalSleepRecords": 1,
        "totalTimeInBed": <value in minutes>
    }
};

// Run the converter on the resource
result = converter.convert(sleepLog);

// The result is a FHIR bundle containing sleep observations
console.log(result);

```

