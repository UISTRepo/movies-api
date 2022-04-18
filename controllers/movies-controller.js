var moviesService = require('../services/movies-service')

exports.index = async function(req, res, next) {
    let movies = await moviesService.getAll();
    res.json(movies)
}

exports.show = function(req, res, next) {
    let id = req.params.id
    res.json(id)
}

exports.store = function (input){
    return 'stored';
}

exports.update = function (input){
    return 'updated';
}

exports.destroy = function (id){
    return 'deleted';
}
