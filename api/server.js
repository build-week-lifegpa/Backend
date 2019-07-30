const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const categoriesRouter = require('../categories/category-routes.js');
const habitsRouter = require('../habits/habits-routes.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/categories', categoriesRouter);
server.use('/api/habits', habitsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'API is working'});
})



module.exports = server;