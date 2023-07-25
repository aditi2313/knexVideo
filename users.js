const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const knex = require('./db/knex');
const { verifyToken } = require("./middleware");

const JWT_SECRET = 'invansys_key';
const JWT_EXPIRATION = '1h';

// Get request from users table.
router.get('/', function(req, res) {
    knex.select().from('users')
    .then(function(users) {
        res.send(users);
    })
})

// Get by id request from users table.
router.get('/:id', function(req, res) {
    knex.select().from('users')
    .where('id', req.params.id)
    .then(function(users) {
        res.send(users);
    })
})

// Post request to users table. Creating a new user.
router.post('/register', function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
  
    // Validate the email format using a regular expression.
    const emailRegex = /@.+\..+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format. Email must end with "@_.com"' });
    }

    knex('users').insert({
        name: name,
        email: email,
        password: password,
        address: address
    })
    .then(function() {
        knex.select().from('users')
        .then(function(users) {
            res.send(users);
        })
    })
})

// Authenticating user credentials.
router.post('/login', function(req, res) {
    knex.select().from('users')
    .where('email', req.body.email)
    .then(function(users) {
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        
        if (user.password === req.body.password) {
            const payload = {
                user_id: user.id,
                email: user.email,
                // You can add more data to the payload if needed.
            };

            jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION }, function (err, token) {
                if (err) {
                    console.error('Error creating JWT:', err);
                    return res.status(500).json({ error: 'Failed to create JWT' });
                }

                // Send the token as a response.
                return res.status(200).json({ token });
            });
        } else {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // res.send(users);
    })
})

// Put request to update user data.
router.put('/:id', verifyToken, function(req, res) {
    const userIdFromToken = req.user_id;

    if (req.params.id !== userIdFromToken) {
        return res.status(403).json({ error: 'Unauthorized: You can only update your own account' });
    }

    knex('users').where('id', req.params.id)
    .update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    })
    .then(function() {
        knex.select().from('users')
        .then(function(users) {
            res.send(users);
        })
    })
})

module.exports = router;
