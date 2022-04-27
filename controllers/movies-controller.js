var moviesService = require('../services/movies-service')
var actorsService = require('../services/actors-service');

exports.index = async function(req, res, next) {
    let movies = await moviesService.getAll();

    for(let i = 0; i < movies.length; i++){
        movies[i] = await prepareMovie(movies[i]);
    }

    res.json(movies);
}

async function prepareMovie(movie){
    let actors = [];

    let actorIds = await actorsService.getMovieActorIds(movie.id);

    for(let j = 0; j < actorIds.length; j++){
        let actor = await actorsService.getById(actorIds[j].actor_id);
        actors.push(actor);
    }

    movie.actors = actors;

    return movie;
}

exports.show = async function(req, res, next) {
    let movie = await moviesService.getById(req.params.id);

    if(movie)
        res.json(await prepareMovie(movie))
    else{
        res.status(404);
        res.json({error: 'Movie not found'});
    }
}

exports.store = async function (req, res, next){

    // TODO: validate the data before storing it!!!

    let valid = true;

    if(valid){
        let input = {
            title: req.body.title,
            length: req.body.length
        };

        let movie = await moviesService.storeNew(input);

        let submittedActorIds = JSON.parse(req.body.actors);

        submittedActorIds.forEach(actor_id => {
            const input = {
                movie_id: movie.insertId,
                actor_id: Number(actor_id)
            }

            moviesService.addActorToMovie(input);

        })

        res.status(201);
        res.json({message: 'Movie stored'});
    }
    else{
        res.status(403);
        res.json({error: 'Invalid data'});
    }
}

exports.update = function (input){
    // todo: create the update logic

    return 'updated';
}

exports.destroy = function (id){
    // todo: create the delete logic

    return 'deleted';
}
