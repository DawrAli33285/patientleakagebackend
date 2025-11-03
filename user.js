// models/user.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true, // ✅ recommended
        unique: true    // ✅ recommended to prevent duplicates
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
