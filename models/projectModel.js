var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var projectSchema = new Schema({	"id" : String,	"name" : String,	"description" : String,	"url" : String,	"tags" : Array,	"author" : {	 	type: Schema.Types.ObjectId,	 	ref: '{ref}'	}});

module.exports = mongoose.model('project', projectSchema);