const router = require('express').Router();
let Competition = require('../models/competition.model');
const authenticate = require('./authenticate');

// Get all of the competitions available
router.route('/').get((req, res) => {
  Competition.find()
    .then(competitions => res.json(competitions))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get distinct countries
router.route('/countries').get((req, res) => {
  Competition.distinct('Country')
    .then(competitions => res.json(competitions))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get competitions of the country
router.route('/country=:Country').get((req, res) => {
  var query = {"Country": req.params.Country};
  Competition.find(query).sort({ CompetitionLevel: 1 })
    .then(competitions => res.json(competitions))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add new competitions
router.route('/new')
  .post(authenticate, async (req, res) => {
    try {
      var newCompetitionData = {
        Country: req.body.Country,
        Competition: req.body.Competition
    }
      const newCompetition = new Competition(newCompetitionData);
      await newCompetition.save();

      res.status(201).json({ message: 'Competition added successfully', competition: newCompetition });
    } catch (error) {
      res.status(500).json({ error: 'Error adding competition' });
    }
  });

// Remove competitions
// Delete request to delete document with ID
router.route('/delete/:_id').get(authenticate, (req, res) => {
  var query = {"_id": req.params._id};
  Competition.findOneAndDelete(query)
    .then(
      res.status(200).json({ message: 'Document deleted successfully' })
    )
    .catch(err => res.status(400).json('Error while deleting: ' + err));
});

module.exports = router;