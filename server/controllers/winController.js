const { connectDB, disconnectDB } = require("../connection");

const winnerUser = require("../database/schemas/winnerSchema");

const create = async (req, res) => {
    const { time, moves, user } = req.body;
    await connectDB();
    
    const newUser = new winnerUser({ time, moves, user });
    
    const WinUser = await newUser.save();
    await disconnectDB();
    res.json(WinUser);
}

module.exports = { create };