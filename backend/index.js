const express = require('express');
const server = express();

const port = process.env.PORT || 3000;

const path = require('path');
const cors = require('cors');

const { serverError } = require('./src/middleware/errorHandler');
const urlRouter = require('./src/routers/urlRouter');
const userRouter = require('./src/routers/userRouter');

server.use(cors());
server.use('/', express.static(path.resolve('./dist'))); // serve main path as static dir
server.get('/', function (req, res) {
  // serve main path as static file
  res.sendFile(path.resolve('./dist/index.html'));
});

server.use('/user', userRouter);
server.use('/url', urlRouter);

server.use(serverError);

// starting the server
server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
