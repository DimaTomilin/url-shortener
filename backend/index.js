const express = require('express');
const server = express();

const port = process.env.PORT || 3000;

const path = require('path');
const cors = require('cors');

const { serverError } = require('./src/middleware/errorHandler');
const urlRouter = require('./src/routers/urlRouter');
const userRouter = require('./src/routers/userRouter');
const { findFile } = require('./src/directive');

server.use(express.json());
server.use(cors());

console.log(path.resolve('../dist')))
server.use('/', express.static('../dist')); // serve main path as static dir
server.get('/', function (req, res) {
  // serve main path as static file
  res.sendFile('../dist/index.html');
});

server.use('/user', userRouter);
server.use('/url', urlRouter);

server.get('/:url', (req, res) => {
  const url = req.params.url;
  const longURL = findFile(url);
  res.redirect(longURL);
  res.end();
});

server.use(serverError);

// starting the server
server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
