const express = require('express');

const accountsRouter = require('./router/accountsRouter');

const server = express();

server.use(express.json());

server.use('/api', accountsRouter);

module.exports = server;
