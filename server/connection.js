const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '35220824Marcelo',
    database: process.env.DB_NAME || 'pokematch',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const connectDB = async () => {
    try {
        await pool.getConnection();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

const disconnectDB = async () => {
    try {
        await pool.end();
        console.log('Disconnected from the database');
    } catch (error) {
        console.error('Error disconnecting from the database:', error);
    }
};

module.exports = { connectDB, disconnectDB };
