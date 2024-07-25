const { insertWinner, getAllWinners } = require('../database/models/winnerModel');

const winController = {
    create: async (req, res) => {
        try {
            const { user, time, moves } = req.body;
            await insertWinner(user, time, moves);
            res.status(201).json({ message: 'Winner saved successfully!' });
        } catch (error) {
            console.error('Error saving winner:', error);
            res.status(500).json({ error: 'Error saving winner' });
        }
    },

    list: async (req, res) => {
        try {
            const winners = await getAllWinners();
            res.status(200).json(winners);
        } catch (error) {
            console.error('Error fetching winners:', error);
            res.status(500).json({ error: 'Error fetching winners' });
        }
    }
};

module.exports = winController;
