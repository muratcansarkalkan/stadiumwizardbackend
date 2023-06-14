// Route creating
const router = require('express').Router();
// Requiring the model, the model we created at models
let User = require('../models/user.model');

// Handles HTTP get request. It was defined at server.js as localhost:5000/users.
// .find() will get all the users from the MongoDB.
router.route('/').get((req, res) => {
  User.find() // this returns a Promise
    .then(users => res.json(users)) // returns in JSON
    .catch(err => res.status(400).json('Error: ' + err)); // try/catch
});

// Handles HTTP post request.
router.route('/add').post((req, res) => {
    // username is set
  const username = req.body.username;
  const newUser = new User({username});
    // mongoDB's save method
  newUser.save()
    .then(() => res.json('User added!')) // Returns the message
    .catch(err => res.status(400).json('Error: ' + err)); // or the error message
});

// exports the router
module.exports = router;
