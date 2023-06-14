const mongoose = require('mongoose');
// Mongoose schema starts this way
const Schema = mongoose.Schema;

// User schema. Similar to a model actually
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
// Automatically creates created time etc
    timestamps: true,
})
// Defines model as User
const User = mongoose.model('User', userSchema);

module.exports = User;