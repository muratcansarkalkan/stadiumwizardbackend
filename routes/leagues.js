const router = require('express').Router();
let League = require('../models/league.model');
const authenticate = require('./authenticate');

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
  League.find(query).sort({ LeagueLevel: 1 })
    .then(leagues => res.json(leagues))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add new leagues
router.route('/new')
  .post(authenticate, async (req, res) => {
    try {
      var newLeagueData = {
        Country: req.body.Country,
        League: req.body.League
    }
      const newLeague = new League(newLeagueData);
      await newLeague.save();

      res.status(201).json({ message: 'League added successfully', league: newLeague });
    } catch (error) {
      res.status(500).json({ error: 'Error adding league' });
    }
  });

// Remove leagues
// Delete request to delete document with ID
router.route('/delete/:_id').get(authenticate, (req, res) => {
  var query = {"_id": req.params._id};
  League.findOneAndDelete(query)
    .then(
      res.status(200).json({ message: 'Document deleted successfully' })
    )
    .catch(err => res.status(400).json('Error while deleting: ' + err));
});

module.exports = router;