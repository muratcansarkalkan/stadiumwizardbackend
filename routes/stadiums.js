const router = require('express').Router();
let Stadium = require('../models/stadium.model');
const authenticate = require('./authenticate');

// Get all of the teams available
router.route('/').get((req, res) => {
    Stadium.find()
    .then(stadiums => res.json(stadiums))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get request to find document with ID
router.route('/:id').get((req, res) => {
    Stadium.findById(req.params.id)
      .then(stadium => res.json(stadium))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Get request to find document with FIFAM ID
router.route('/IDspecific/:teamId').get((req, res) => {
    var query = {"teamId": req.params.teamId};
    Stadium.find(query)
      .then(stadium => res.json(stadium))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Delete request to delete document with ID
router.route('/IDspecific/delete/:_id').get(authenticate, (req, res) => {
    var query = {"_id": req.params._id};
    Stadium.findOneAndDelete(query)
      .then(
        res.status(200).json({ message: 'Document deleted successfully' })
      )
      .catch(err => res.status(400).json('Error while deleting: ' + err));
});

module.exports = router;