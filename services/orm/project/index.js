'use strict';
var Db = require('../db'); 
var Project = require('../../../model/project');

module.exports = function(config){
	return {
		findById : function(id, callback){
			var db = new Db(config);
			db.exec(function(){
				Project.findById(id, function(err, doc){
					callback(doc);
					mongoose.connection.close();				
				});
			});
		},
		findAll : function(callback){
			var db = new Db(config);
			db.exec(function(){
				Project.find({}, function(err, doc){
					callback(doc);
				});
			});
		},
		groupByTags : function(callback){
			var db = new Db(config);
			db.exec(function(){
				Project.aggregate([
					{
						$group : {
							_id : "tags",
							count: {$sum : 1}
						}	
					}
				], function(err, doc){
					callback(doc);
				});
			});
		}
	};
};