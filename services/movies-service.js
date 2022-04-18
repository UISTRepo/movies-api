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
