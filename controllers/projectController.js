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
            var response = function(doc){
                if(doc){
                    res.json(doc);
                }else{
                    res.sendStatus(404);
                }
            };
            var id = req.params.id;
            logger.info('id :'+id); 
            if(id){
                ProjectORM.findById(id, response);
            }else{
                ProjectORM.findAll(response);
            }
        },
        groupByTags: function(req, res){
            logger.info('group by tags actions...');
            var response = function(doc){
                if(doc){
                    res.json(doc);
                }else{
                    res.sendStatus(404);
                }
            };
            ProjectORM.groupByTags(response);
        }
    };
};