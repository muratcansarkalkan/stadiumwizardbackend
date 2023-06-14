const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stadiumSchema = new Schema({
    teamName: {
        type: String,
    },
    teamId: {
        type: String,
    },
    country: {
        type: String,
    },
    date: {
        type: String,
    },
    file: {
        type: String,
    },
},)

const Stadium = mongoose.model('stadium', stadiumSchema, 'stadiums');

module.exports = Stadium;