const fs = require('fs');

function isUser(req, res, next) {
  const username = req.headers.username;

  if (!username) {
    return res.status(401).send('Missing username!');
  } else if (!fs.existsSync(`./backend/users/${username.toLowerCase()}`)) {
    return res.status(401).send('Unknown username. Please make sing in.');
  }

  next();
}

module.exports = isUser;
