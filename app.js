const express = require('express');
const path = require('path')
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT ?? 4040;

const navController = require('./server/controllers/navController');

app.use(express.static(path.join(__dirname, './client')));


app.use(cors());
app.use(express.json());

const pokeAPI = fs.readFileSync('pokeAPI.json', 'utf-8')
const pokemonArray = JSON.parse(pokeAPI);

app.get('/pokeAPI', (req, res) => {
    res.json(pokemonArray)
});

app.get('/', navController.goIndex);


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});