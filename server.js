const express = require('express');
const cors = require('cors');
// Connecting to MongoDB database
const mongoose = require('mongoose');
// Route connections
const leaguesRouter = require('./routes/leagues');
const stadiumsRouter = require('./routes/stadiums');
const teamsRouter = require('./routes/teams');
const loginRouter = require('./routes/login'); 
const logoutRouter = require('./routes/logout'); 
// Import the libraries for basic auth
const session = require('express-session');
const cookieParser = require('cookie-parser');

// environment variables in .env file
require('dotenv').config();

// Creating Express server
const app = express();
const port = process.env.port || 5000;

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET, // Replace with a strong secret key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Adjust secure flag based on your environment (true for HTTPS)
  }));
  
// CORS middleware
// app.use(cors());
app.use(cors({credentials: true, origin: ['http://localhost:3000', 'https://stadiumwizard.vercel.app']}));

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
// Loads
app.use('/leagues', leaguesRouter);
app.use('/stadiums', stadiumsRouter);
app.use('/teams', teamsRouter);
app.use('/auth', loginRouter); // Mount the authentication routes
app.use('/auth', logoutRouter); // Mount the authentication routes

// Starts listening on a port, starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

module.exports = app;
