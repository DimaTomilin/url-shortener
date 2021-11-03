const express = require("express");
const router = express.Router();
const fs = require("fs");
const isUser = require("../middleware/userHandler");

// creating a user
router.put("/create/:username", (request, response) => {
  const userName = request.params.username.toLocaleLowerCase();
  const dir = `./users/${userName}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  response.send("Hey you signed in as " + userName);
  response.end();
});

// the most useless function ever, has no purpose but it was a requirement
router.post("/info", isUser, (request, response) => {
  response.send("Hey " + request.headers.username);
  response.end();
  return;
});

module.exports = router;
