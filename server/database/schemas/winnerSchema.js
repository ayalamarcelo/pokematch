const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const winnerSchema = new Schema({
  user: String,
  time: String,
  moves: Number
});

const winnerUser = model("winnerUser", winnerSchema);

module.exports = winnerUser;