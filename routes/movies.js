var express = require('express');
var router = express.Router();

var moviesController = require('../controllers/movies-controller');
var jwtHelper = require('../helpers/jwt-helper');

router.get('/', jwtHelper.authenticateToken, moviesController.index);
router.get('/:id', jwtHelper.authenticateToken, moviesController.show);

router.post('/', jwtHelper.authenticateToken, moviesController.store);

module.exports = router;
