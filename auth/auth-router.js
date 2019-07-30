const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');

router.post('/register', validateUser, (req, res) => {
    // console.log("auth register happening");
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
            
        });   
})

router.post('/login', validateUser, (req, res) => {
    const { username, password } = req.body;
    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome ${user.username}`,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials.' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    });
});

function generateToken(user) {
    const payload = {
        user_id: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
};

function validateUser(req, res, next) {
    const userInfo = req.body;
    if (userInfo.username === undefined) {
        return res.status(400).json({ errorMessage: "Please provide username." });
    } else if (userInfo.password === undefined) {
        return res.status(400).json({ errorMessage: "Please provide password." });
    } else {
        next();
    }
}


module.exports = router;