var mysqlConfig = require('../connections/mysql');
var connection = mysqlConfig.connection;

exports.getAll = () =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM movies ',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

exports.getById = (id) =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM movies WHERE id = ' + id,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements[0]);
        });
    });
};

exports.storeNew = (input) =>{
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO movies (title, length) VALUES ('" + input.title + "', " + input.length + ")";

        connection.query(sql,  (error, movie)=>{
            if(error){
                return reject(error);
            }
            return resolve(movie);
        });
    });
};

exports.addActorToMovie = (input) =>{
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO actors_movies (actor_id, movie_id) VALUES (" + input.actor_id + ", " + input.movie_id + ")";

        connection.query(sql,  (error, movie)=>{
            if(error){
                return reject(error);
            }
            return resolve(movie);
        });
    });
};
