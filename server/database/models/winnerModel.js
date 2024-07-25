const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '35220824Marcelo',
  database: process.env.DB_NAME || 'pokematch'
});

const insertWinner = (user, time, moves) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO winners (user, time, moves) VALUES (?, ?, ?)';
    connection.query(query, [user, time, moves], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getAllWinners = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM winners';
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { insertWinner, getAllWinners };
