const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    Country: {
        type: String,
    },
    League: {
        type: String,
    }
},)

const League = mongoose.model('league', leagueSchema, 'leagues');

module.exports = League;