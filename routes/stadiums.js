const router = require('express').Router();
let Country = require('../models/country.model');
let Stadium = require('../models/stadium.model');
const authenticate = require('./authenticate');

// Get all of the teams available
router.route('/').get((req, res) => {
    Stadium.find()
    .then(stadiums => res.json(stadiums))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get total count of all stadiums
router.route('/count').get((req, res) => {
  Stadium.countDocuments({})
  .then(count => res.json({ total: count }))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Get count of stadiums with a filter (e.g., /count/filter?city=London)
router.route('/search-count').get((req, res) => {
  // req.query will be { country: 'Italy', city: 'Milan' }
  const filter = req.query;

  Stadium.countDocuments(filter)
      .then(count => res.json({ 
          criteria: filter, 
          total: count 
      }))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Count by country
router.route('/counts-by-country').get((req, res) => {
  // 1. Get every country from the countries collection
  Country.find().sort({ Name: 1 })
      .then(countries => {
          // 2. Map each country to a count request
          const countPromises = countries.map(country => {
              // We use country.Name to filter the Stadium collection
              return Stadium.countDocuments({ country: country.Name })
                  .then(count => ({
                      country: country.Name,
                      count: count
                  }));
          });

          // 3. Resolve all promises
          return Promise.all(countPromises);
      })
      .then(results => res.json(results))
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

// Delete request to delete document with teamID
router.route('/IDspecific/deletebyTeamId/:teamId').get(authenticate, (req, res) => {
  var query = {"teamId": req.params.teamId};
  Stadium.findOneAndDelete(query)
    .then(
      res.status(200).json({ message: 'Document deleted successfully' })
    )
    .catch(err => res.status(400).json('Error while deleting: ' + err));
});

module.exports = router;