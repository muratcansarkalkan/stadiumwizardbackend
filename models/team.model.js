const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    Country: {
        type: String,
    },
    Name: {
        type: String,
    },
    FIFAManagerID: {
        type: String,
    },
    Status: {
        type: String,
    },
    Competition: {
        type: String,
    },
    
    City: {
        type: String,
    },
    Reputation: {
        type: Number,
    },
    CompetitionLevel: {
        type: Number,
    },
    Valid: {
        type: Number,
    },
    IsNew: {
        type: Number,
    },
}, {
    timestamps: true,
})

const Team = mongoose.model('team', teamSchema, 'teams');

module.exports = Team;