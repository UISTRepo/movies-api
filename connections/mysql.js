var mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ip_express_basics'
}

module.exports = {
    connection: mysql.createConnection(config)
}
