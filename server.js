const express = require('express');
const cors = require('cors');
// Connecting to MongoDB database
const mongoose = require('mongoose');

// environment variables in .env file
require('dotenv').config();

// Creating Express server
const app = express();
const port = process.env.port || 5000;

// CORS middleware
app.use(cors());
// Allow to parse as JSON
app.use(express.json());

// MongoDB database URI from Atlas Dashboard
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    }); 
    
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Route connections
const exercisesRouter = require('./routes/exercises');
const leaguesRouter = require('./routes/leagues');
const usersRouter = require('./routes/users');
const stadiumsRouter = require('./routes/stadiums');
const teamsRouter = require('./routes/teams');
// Loads
app.use('/leagues', leaguesRouter);
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/stadiums', stadiumsRouter);
app.use('/teams', teamsRouter);

// Starts listening on a port, starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

module.exports = app;
