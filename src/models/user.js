const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true  },
    password: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);