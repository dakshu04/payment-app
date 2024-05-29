const mongoose = require('mongoose');

mongoose.connect("mongodb://dakshgrows:dakshu04@ac-nfjve7v-shard-00-00.9xrsezn.mongodb.net:27017,ac-nfjve7v-shard-00-01.9xrsezn.mongodb.net:27017,ac-nfjve7v-shard-00-02.9xrsezn.mongodb.net:27017/?replicaSet=atlas-78ogd4-shard-0&ssl=true&authSource=admin");

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Account
};
