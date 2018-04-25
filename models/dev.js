// model requirments
const mongoose = require('mongoose');

// mongoose schema

const developerSchema = new mongoose.Schema({
	name: String,
	location: String,
	gameId: String
});

module.exports = mongoose.model('Developer', developerSchema);
