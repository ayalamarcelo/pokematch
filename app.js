require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4040;

const { connectDB, disconnectDB } = require('./server/connection');

const navController = require('./server/controllers/navController');
const winController = require('./server/controllers/winController');

app.use(express.static(path.join(__dirname, './client')));
app.use(cors());
app.use(express.json());

const pokeAPI = fs.readFileSync('pokeAPI.json', 'utf-8');
const pokemonArray = JSON.parse(pokeAPI);

app.get('/pokeAPI', (req, res) => {
    res.json(pokemonArray);
});

app.get('/', navController.goIndex);
app.post('/api/winner', winController.create);
app.get('/api/winners', winController.list);

(async () => {
    try {
        await connectDB();
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    } finally {
        app.listen(PORT, () => {
            console.log(`Listening on http://localhost:${PORT}`);
        });
    }
})();

process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit();
});

process.on('SIGTERM', async () => {
    await disconnectDB();
    process.exit();
});
