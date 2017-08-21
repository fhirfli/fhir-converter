var fhir = require('../lib/fhir-converter');

// Creating a converter from Fitbit to FHIR
var converter = new fhir('fitbit');

// Your resource to convert
var fatLog = {
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

// Run the converter on the resource
result = converter.convert(fatLog);

// The result is a FHIR bundle containing sleep observations
console.log(result);
