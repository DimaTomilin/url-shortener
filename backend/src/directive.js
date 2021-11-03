const fs = require('fs');
const { format } = require('path');
const shortid = require('shortid');

// creating the json file with the pokemon format
function createURLFile(longURL, shortURL, userDir) {
  fs.writeFileSync(
    `./backend/users/${userDir}/${shortURL}.json`,
    JSON.stringify(creatURLObject(shortURL, longURL))
  );
}

function updateCounter(shortURL, userDir) {
  console.log('yes');
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

function creatURLObject(shortURL, longURL) {
  const newObject = {
    LongURL: longURL,
    ShortURL: shortURL,
    Counter: 0,
    CreateTime: creatingTime(),
  };
  return newObject;
}

// reading all the files in the user dir and returning an array with the LongURL of the shortens
function readFiles(dirname) {
  const dataArr = {};
  const filesArr = fs.readdirSync(dirname);
  for (const file of filesArr) {
    let data = JSON.parse(fs.readFileSync(`${dirname}/${file}`));
    dataArr[data.ShortURL] = data.LongURL;
  }
  return dataArr;
}

function urlCheck(url) {
  const allUsers = fs.readdirSync(`./backend/users`);
  for (const user of allUsers) {
    if (fs.existsSync(`./backend/users/${user}/${url}.json`)) {
      return true;
    }
  }
  return false;
}

function randomURL() {
  const randomURL = shortid.generate();
  if (urlCheck(randomURL)) {
    return randomURL();
  }
  return randomURL;
}

function creatingTime() {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}

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
