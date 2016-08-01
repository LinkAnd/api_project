var express = require('express');
var router = express.Router();
var projectController = require('../controllers/projectController.js');

/*
 * GET
 */
router.get('/', function(req, res) {
    projectController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
    projectController.show(req, res);
});

/*
 * POST
 */
router.post('/', function(req, res) {
    projectController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function(req, res) {
    projectController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    projectController.remove(req, res);
});

module.exports = router;