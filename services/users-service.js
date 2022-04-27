var mysqlConfig = require('../connections/mysql');
var connection = mysqlConfig.connection;

var bcrypt = require('bcrypt');

exports.cryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err)
                return reject(err);

            bcrypt.hash(password, salt, function(err, hash) {
                return resolve(hash);
            });
        });
    });
};

exports.comparePassword = (plainPass, hashword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
            return err == null ?  resolve(isPasswordMatch) : reject(err);
        });
    });
};

exports.getById = (id) =>{
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE id = " + id;

        connection.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements[0]);
        });
    });
};

exports.getByEmail = (email) =>{
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email = '" + email + "'";

        connection.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements[0]);
        });
    });
};

exports.register = (input) =>{
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO users (name, email, password) VALUES ('" + input.name + "', '" + input.email + "', '" + input.password + "')";

        connection.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};
