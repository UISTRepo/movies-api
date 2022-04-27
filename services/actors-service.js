var mysqlConfig = require('../connections/mysql');
var connection = mysqlConfig.connection;

exports.getMovieActorIds = (movie_id) =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM actors_movies WHERE movie_id = ' + movie_id,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

exports.getById = (id) =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM actors WHERE id = ' + id,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements[0]);
        });
    });
};
