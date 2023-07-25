const express = require('express');
const router = express.Router();
const knex = require('./db/knex');

// Get request from orders table.
router.get('/', function(req, res) {
    knex.select().from('orders')
    .then(function(orders) {
        res.send(orders);
    })
})

// Get by id request from orders table.
router.get('/:id', function(req, res) {
    knex.select().from('orders')
    .where('id', req.params.id)
    .then(function(orders) {
        res.send(orders);
    })
})

// Post request to orders table.
router.post('/', function(req, res) {
    const user_id = req.body.user_id;
    const order_details = req.body.order_details;

    if (order_details.quantity > 0) {
        knex('orders').insert({
            user_id: user_id,
            order_details: order_details
        })
        .then(function() {
            knex.select().from('orders')
            .then(function(orders) {
                res.send(orders);
            })
        })
    } else {
        return res.status(401).json({ error: 'Invalid order details' });
    }
})

// Delete request to delete an order.
router.delete('/:id', function(req, res) {
    knex('orders').where('id', req.params.id)
    .del()
    .then(function() {
        knex.select().from('orders')
        .then(function(orders) {
            res.send(orders);
        })
    })
})

// Get request to return orders of a user.
router.get('/orders-of-user/:id', function(req, res) {
    knex.from('orders')
    .innerJoin('users', 'orders.user_id', 'users.id')
    .where('orders.user_id', req.params.id)
    .then(function(data) {
        res.send(data);
    })
})

module.exports = router;
