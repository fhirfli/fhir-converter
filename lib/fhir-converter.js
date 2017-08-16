var Converter = function (platformConf) {

	// The configuration of the converter
	// Currently accepts only "fitbit"
	this.conf = require('./platforms/'+platformConf+'/config.js');

	// The converting function
	this.convert = function (data) {
		var result = this.conf.map_existing_keys(data);
		return result;
	}
	
};

module.exports = Converter;
