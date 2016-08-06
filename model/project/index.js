var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var projectSchema = new Schema({
	"name" : String,
	"description" : String,
	"url" : String,
	"tags" : Array,
	"author" : String
});

module.exports = mongoose.model('project', projectSchema);