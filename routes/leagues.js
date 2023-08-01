const router = require('express').Router();
let League = require('../models/league.model');

// Get all of the leagues available
router.route('/').get((req, res) => {
  League.find()
    .then(leagues => res.json(leagues))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get distinct countries
router.route('/countries').get((req, res) => {
  League.distinct('Country')
    .then(leagues => res.json(leagues))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get leagues of the country
router.route('/country=:Country').get((req, res) => {
  var query = {"Country": req.params.Country};
  League.find(query)
    .then(leagues => res.json(leagues))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;