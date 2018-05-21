/*globals module */
/*
    Module to define all the Configurations required
*/
let Config = function () {
	return {
		dbPath : "mongodb://127.0.0.1:27017/sample-db", 
	};
};

module.exports = new Config();