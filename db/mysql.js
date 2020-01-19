const db = require('mysql2');

const pool = db.createPool({
  host: '192.168.99.100',
  port: '3306',
  user: 'admin',
  password: '123456',
  database: 'my-whisky-house-db',
  multipleStatements: true,
  charset: 'utf8',
  connectTimeout: 10000
});

module.exports = pool.promise();