
var express = require('express');
var app = express();
var request = require('request');
var _ = require('lodash');
var config = require('./config');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accessToken");
  next();
});

app.get('/', function (req, res) {
  
  res.send('Hello World!');
});


/**
* CONTROLLER
*/
var ProjectController = require('./controllers/projectController.js')(config);

/**
* services section
*/
var logger = require('./services/logger')(config);

/**
* accessToken 
*/
function isAccess (req, res, next){
	if(req.headers.accessToken){
		next();
	}else{
		res.send(401);
	}
}

/*
* IMPORTANT PRIVATE route
*/
app.get('/info', isAccess,function(req, res){	
    request.get({url:'http://localhost:3000/authorize', headers:{accesstoken: req.headers.accesstoken}}, function(err, response){
    	if(err){
    		console.log(err);
    	}
    	console.log('ici');
    	res.json(response.body);
    });
});

app.get('/project', ProjectController.list);


app.listen(config.server.port, function () {
  logger.info('project running on '+ config.server.port);
});