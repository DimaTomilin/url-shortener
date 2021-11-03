const fs = require('fs');
const path = require('path');
const { readFiles } = require('../directive');

function isURLExist(req, res, next) {
  const URL = req.body.url;
  const dir = req.headers.username;
  const homedir = './backend/users';

  const allShortenURLs = fs.readdirSync(path.join(homedir, dir));

  allShortenURLs.forEach((url) => {
    const urlInformation = JSON.parse(
      fs.readFileSync(path.join(homedir, dir, url))
    );
    if (urlInformation.LongURL === URL) {
      return res.status(403).send('Shorten URL to this URl already exist.');
    }
  });

  next();
}

function serverError(error, req, res, next) {
  res.status(500);
  res.send('Oops, something went wrong.');
  res.end();
}

module.exports = {
  isURLExist,
  serverError,
};
