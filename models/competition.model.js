const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const competitionSchema = new Schema({
    Country: {
        type: String,
    },
    Competition: {
        type: String,
    }
},)

const Competition = mongoose.model('competition', competitionSchema, 'competitions');

module.exports = Competition;