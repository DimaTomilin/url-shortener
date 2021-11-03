const fs = require('fs');
const express = require('express');
const router = express.Router();
const isUser = require('../middleware/userHandler');
const { isURLExist } = require('../middleware/errorHandler');
const { randomURL, createURLFile, readFiles } = require('../directive');

// user middleware error handler
router.use(isUser);

router.put('/create', isURLExist, (request, response) => {
  const username = request.headers.username;
  const oldURL = request.body.url;
  //to check body in front
  const newURL = randomURL();
  createURLFile(oldURL, newURL, username);
  response.json({ newURL });
  response.end();
});

router.get('/statictic/:url', (request, response) => {
  const username = request.headers.username;
  const url = request.params.url;
  const urlInformation = JSON.parse(
    fs.readFileSync(`./backend/users/${username}/${url}`)
  );
  response.json({ urlInformation });
  response.end();
});

module.exports = router;
