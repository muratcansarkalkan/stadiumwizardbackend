const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    Country: {
        type: String,
    },
    Name: {
        type: String,
    }
},)

const Country = mongoose.model('country', countrySchema, 'countries');

module.exports = Country;