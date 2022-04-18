var express = require('express');
var router = express.Router();

var moviesController = require('../controllers/movies-controller');

router.get('/', moviesController.index);
router.get('/:id', moviesController.show);

module.exports = router;
