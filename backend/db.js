// backend/db.js
const mongoose = require('mongoose');

mongoose.connect("mongodb://dakshgrows:dakshpurohit04@ac-6mdqwov-shard-00-00.gubcybk.mongodb.net:27017,ac-6mdqwov-shard-00-01.gubcybk.mongodb.net:27017,ac-6mdqwov-shard-00-02.gubcybk.mongodb.net:27017/?replicaSet=atlas-14eba9-shard-0&ssl=true&authSource=admin");

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
	User
};