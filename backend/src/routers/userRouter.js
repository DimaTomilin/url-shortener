const express = require('express');
const router = express.Router();
const fs = require('fs');
const isUser = require('../middleware/userHandler');
const { readFiles } = require('../directive');

// creating a user
router.put('/create/:username', (req, res) => {
  const userName = req.params.username.toLocaleLowerCase();
  const dir = `./backend/users/${userName}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  res.send('Hey you signed in as ' + userName);
  res.end();
});

//get message which user I use at the moment
router.get('/info', isUser, (req, res) => {
  res.send('Hey ' + req.headers.username);
  res.end();
});

//get list of all shorten urls
router.get('/all', isUser, (req, res) => {
  const username = req.headers.username;
  const allUserURL = readFiles(`./backend/users/${username}`);
  res.json(allUserURL);
  res.end();
});

module.exports = router;
