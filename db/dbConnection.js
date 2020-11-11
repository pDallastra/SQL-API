const mysql = require('mysql');

let connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@Tp88125707',
    database: 'db_gallery_video'
});

module.exports = connection;