const express = require('express');
const router = express.Router();
const knex = require('./db/knex');

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

// Post request to users table.
router.post('/', function(req, res) {
    knex('users').insert({
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

// Put request to update user data.
router.put('/:id', function(req, res) {
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
