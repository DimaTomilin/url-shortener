const fs = require('fs');
const { format } = require('path');

// creating the json file with the pokemon format
function createURLFile(longURL, shortURL, userDir) {
  fs.writeFileSync(
    `${userDir}/${shortURL}.json`,
    JSON.stringify(creatURLObject(shortURL, longURL))
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
  const dataArr = [];
  let filesArr = fs.readdirSync(dirname);
  for (const file of filesArr) {
    let data = JSON.parse(fs.readFileSync(`${dirname}/${file}`)).LongURL;
    dataArr.push(data);
  }
  return dataArr;
}

function urlCheck(URL) {
  const allUsers = fs.readdirSync(`./backend/users`);
  for (const user of allUsers) {
    if (fs.existsSync(`./users/${user}/${URL}`)) {
      return true;
    }
  }
  return false;
}

function randomURL() {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    let number = Math.floor(Math.random() * 126);
    if (number < 33) {
      number += 33;
    }
    arr.push(number);
  }
  const randomURL = String.fromCharCode(...arr);
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

module.exports = {
  createURLFile,
  randomURL,
  readFiles,
};
