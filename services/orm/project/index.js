'use strict';
var Db = require('../db'); 
var Project = require('../../../model/project');
 
module.exports = function(config){
	return {
		findById : function(id, callback){
			var db = new Db(config);
			db.exec(function(mongoose){
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
					mongoose.connection.close();
				});
			});
		},
		findByTag: function(tags, callback){
			var db = new Db(config);
			db.exec(function(mongoose){
				Project.find({ tags: { "$in" : tags}}, function(err, doc){
					callback(doc);
					mongoose.connection.close();
				});
			});
		},
		groupByTags : function(callback){
			var db = new Db(config);
			db.exec(function(mongoose){
				Project.aggregate([
					{ $match: { } } 
				  , { $project: { tags: 1 } } 
				  , { $unwind: '$tags' } 
				  , { $group: { 
				          _id: { tag: '$tags' } 
				        , count: { $sum: 1 } 
				      }
				    }
				], function(err, doc){
					callback(doc);
					mongoose.connection.close();
				});
			});
		},
		add: function(project, callback){
			var db = new Db(config);
			db.exec(function(mongoose){
				var p = new Project(project);
				p.save(function(err, doc){
					mongoose.connection.close();
				});
			});
		}
	};
};