const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const server = express();

server.use(express.json());
server.use(cors());
server.use(express.json());



server.get('/', (req, res) => {
    res.status(200).json({ api: 'API is working'});
})

module.exports = server;