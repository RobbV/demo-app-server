// model requirments
const mongoose = require('mongoose');

// mongoose schema

const gameSchema = new mongoose.Schema({
	title: String,
	genre: String,
	developerId: String
});

module.exports = mongoose.model('Game', gameSchema);
