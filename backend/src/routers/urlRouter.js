const fs = require('fs');
const express = require('express');
const router = express.Router();
const isUser = require('../middleware/userHandler');
const { isURLExist } = require('../middleware/errorHandler');
const { randomURL, createURLFile } = require('../directive');

// user middleware error handler
router.use(isUser);

router.put('/create', isURLExist, (req, res) => {
  const username = req.headers.username;
  const oldURL = req.body.url;
  const newURL = randomURL();
  createURLFile(oldURL, newURL, username);
  res.json({ newURL });
  res.end();
});

router.get('/statistic', isUser, (req, res) => {
  const username = req.headers.username;
  const url = req.query.url;
  const urlInformation = JSON.parse(
    fs.readFileSync(`./backend/users/${username}/${url}.json`)
  );
  res.json(urlInformation);
  res.end();
});

module.exports = router;
