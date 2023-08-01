const router = require('express').Router();
let Country = require('../models/country.model');

// Get all of the countries available
router.route('/').get((req, res) => {
  Country.find()
    .then(countries => res.json(countries))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;