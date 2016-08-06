/**
 * projectController.js
 *
 * @description :: Server-side logic for managing projects.
 */
module.exports = function(config){
    var logger = require('../services/logger')(config);
    var ProjectORM = require('../services/orm/project/')(config);
    logger.info('Initialise Project controller');

    return {
        list : function(req, res){
            logger.info('List action ....');
    
            var id = req.params.id;
            logger.info('id :'+id); 
            if(id){
                ProjectORM.findById(id, function(doc){
                    res.json(doc);
                });
            }else{
                ProjectORM.findAll(function(doc){
                    res.json(doc);
                });
            }
        },
        groupByTags: function(req, res){
            logger.info('group by tags actions...');
    
            ProjectORM.groupByTags(function(doc){
                res.send(doc);
            });
        },
        add: function(req, res){
            logger.info('add action...');
    
            ProjectORM.add(req.body, function(){
                res.sendStatus(200);
            });
        },
        requestByTag: function(req, res){
            var tag = (req.body.tag) ? new Array(req.body.tag) : req.body.tags;
            logger.info("request select * project where tag(s) "+tag);
           ProjectORM.findByTag(tag, function(doc){
                res.json(doc);
            });
        }
    };
};