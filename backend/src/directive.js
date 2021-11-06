const fs = require('fs');
const shortid = require('shortid');

// creating the json file with shorten url in user directory
function createURLFile(longURL, shortURL, userDir) {
  fs.writeFileSync(
    `./backend/users/${userDir}/${shortURL}.json`,
    JSON.stringify(creatURLObject(shortURL, longURL))
  );
}

//Updating counter of clicks of each shorten url
function updateCounter(shortURL, userDir) {
  const path = `./backend/users/${userDir}/${shortURL}.json`;
  const file = JSON.parse(fs.readFileSync(path));
  file.Counter += 1;
  fs.writeFileSync(
    path,
    JSON.stringify({
      LongURL: file.LongURL,
      ShortURL: shortURL,
      Counter: file.Counter,
      CreateTime: file.CreateTime,
    })
  );
}

//Creating object with url format
function creatURLObject(shortURL, longURL) {
  const newObject = {
    LongURL: longURL,
    ShortURL: shortURL,
    Counter: 0,
    CreateTime: creatingTime(),
  };
  return newObject;
}

// reading all the files in the user dir and returning an object of all shortens of user
function readFiles(dirname) {
  const dataArr = {};
  const filesArr = fs.readdirSync(dirname);
  for (const file of filesArr) {
    let data = JSON.parse(fs.readFileSync(`${dirname}/${file}`));
    dataArr[data.ShortURL] = data.LongURL;
  }
  return dataArr;
}

//Check if this shorten id been used before
function urlCheck(url) {
  const allUsers = fs.readdirSync(`./backend/users`);
  for (const user of allUsers) {
    if (fs.existsSync(`./backend/users/${user}/${url}.json`)) {
      return true;
    }
  }
  return false;
}

//Generate random short url
function randomURL() {
  const randomURL = shortid.generate();
  if (urlCheck(randomURL)) {
    return randomURL();
  }
  return randomURL;
}

//Making create time by specific format
function creatingTime() {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}

//Search file by short URL and return long URL of this file
function findFile(url) {
  const allUsers = fs.readdirSync('./backend/users');
  for (const user of allUsers) {
    if (fs.existsSync(`./backend/users/${user}/${url}.json`)) {
      const file = JSON.parse(
        fs.readFileSync(`./backend/users/${user}/${url}.json`)
      );
      updateCounter(url, user);
      return file.LongURL;
    }
  }
}

module.exports = {
  createURLFile,
  randomURL,
  readFiles,
  findFile,
};
