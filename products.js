const express = require('express');
const router = express.Router();
const knex = require('./db/knex');

// Get request from products table.
router.get('/', function(req, res) {
    knex.select().from('products')
    .then(function(products) {
        res.send(products);
    })
})

// Get by id request from products table.
router.get('/:id', function(req, res) {
    knex.select().from('products')
    .where('id', req.params.id)
    .then(function(products) {
        res.send(products);
    })
})

// Post request to products table.
router.post('/', function(req, res) {
    knex('products').insert({
        name: req.body.name,
        price: req.body.price,
        units_available: req.body.units_available
    })
    .then(function() {
        knex.select().from('products')
        .then(function(products) {
            res.send(products);
        })
    })
})

// Put request to update product data.
router.put('/:id', function(req, res) {
    knex('products').where('id', req.params.id)
    .update({
        name: req.body.name,
        price: req.body.price,
        units_available: req.body.units_available
    })
    .then(function() {
        knex.select().from('products')
        .then(function(products) {
            res.send(products);
        })
    })
})

// Delete request to delete a product.
router.delete('/:id', function(req, res) {
    knex('products').where('id', req.params.id)
    .del()
    .then(function() {
        knex.select().from('products')
        .then(function(products) {
            res.send(products);
        })
    })
})

module.exports = router;
