const router = require('express').Router();
let Team = require('../models/team.model');

// Get all of the teams available
router.route('/').get((req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Teams in a country
router.route('/country=:Country').get((req, res) => {
  var query = {"Country": req.params.Country};
  Team.find(query)
    .then(team => res.json(team))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Teams in a league
router.route('/league=:League').get((req, res) => {
  var query = {"League": req.params.League};
  Team.find(query)
    .then(team => res.json(team))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get all of the teams available with stadium data
router.route('/stadiumdata/league=:League').get((req, res) => {
  Team.aggregate([
      {$match:
      {'League': req.params.League}
      },
      { $lookup:
         {
           from: 'stadiums',
           localField: 'FIFAManagerID',
           foreignField: 'teamId',
           as: 'stadiumData'
         }
       }
      ])
  .then(teams => res.json(teams))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Get request to find document with ID
router.route('/IDspecific/:FIFAManagerID').get((req, res) => {
  var query = {"FIFAManagerID": req.params.FIFAManagerID};
  Team.find(query)
    .then(team => res.json(team))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;