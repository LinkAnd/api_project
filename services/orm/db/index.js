'use strict';
var mongoose = require('mongoose');
var Logger = require('../../logger');

module.exports = function(config){
	var logger = Logger(config);

	this.exec = function(process){
		mongoose.connect(config.db.connectionString);
    	var db= mongoose.connection;

    	db.on('error', function(err){
	        logger.error('mongo '+err);
	        mongoose.connection.close();	        
	    });

	    db.once('open', function(){
	    	process(mongoose);
	    });
	}
};