
const basicAuth = require('basic-auth');
require('dotenv').config();

// Sample user data (ideally, this should be stored securely)
const validUsername = process.env.SUPERUSERNAME;
const validPassword = process.env.SUPERPASSWORD;

// Basic Authentication middleware
const authenticate = (req, res, next) => {
  const credentials = basicAuth(req);

  if (!credentials || credentials.name !== validUsername || credentials.pass !== validPassword) {
    res.set('WWW-Authenticate', 'Basic realm="Authentication Required"');
    return res.status(401).send('Unauthorized');
  }

  next();
};

module.exports = authenticate