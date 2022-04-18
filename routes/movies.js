var express = require('express');
var router = express.Router();

var moviesController = require('../controllers/movies-controller');

router.get('/', function(req, res, next) {
    let movies = moviesController.index();
    res.json(movies)
});

router.get('/:id', function(req, res, next) {
    let movie = moviesController.show(req.params.id);
    res.json(movie)
});

module.exports = router;
