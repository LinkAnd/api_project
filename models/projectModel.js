var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var projectSchema = new Schema({

module.exports = mongoose.model('project', projectSchema);