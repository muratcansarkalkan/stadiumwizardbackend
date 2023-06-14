const router = require('express').Router();
let Team = require('../models/team.model');

// Get all of the teams available
router.route('/').get((req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get all of the teams available with stadium data
router.route('/stadiumdata').get((req, res) => {
  Team.aggregate([
      { $lookup:
         {
           from: 'stadiums',
           localField: 'FIFAManagerID',
           foreignField: 'teamId',
           as: 'stadiumData'
         }
       }
      ])
  .then(stadiums => res.json(stadiums))
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