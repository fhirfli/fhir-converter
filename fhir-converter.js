var Converter = function (mapConf) {
	this.m = require('./map config/'+mapConf);

	this.convert = function (data) {
		var mapped = this.m.map_existing_keys(data);
		return mapped;
	}
};

module.exports = Converter;
