var Converter = function (platformConf) {
	this.m = require('./platforms/'+platformConf+'/config.js');

	this.convert = function (data) {
		var mapped = this.m.map_existing_keys(data);
		return mapped;
	}
};

module.exports = Converter;
