var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8001;
var knex = require('./db/knex');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// Get request from users table.
app.get('/users', function(req, res) {
    knex.select().from('users')
    .then(function(users) {
        res.send(users);
    })
})

// Get request from products table.
app.get('/products', function(req, res) {
    knex.select().from('products')
    .then(function(products) {
        res.send(products);
    })
})

// Get request from orders table.
app.get('/orders', function(req, res) {
    knex.select().from('orders')
    .then(function(orders) {
        res.send(orders);
    })
})

// Get by id request from users table.
app.get('/users/:id', function(req, res) {
    knex.select().from('users')
    .where('id', req.params.id)
    .then(function(users) {
        res.send(users);
    })
})

// Get by id request from products table.
app.get('/products/:id', function(req, res) {
    knex.select().from('products')
    .where('id', req.params.id)
    .then(function(products) {
        res.send(products);
    })
})

// Get by id request from orders table.
app.get('/orders/:id', function(req, res) {
    knex.select().from('orders')
    .where('id', req.params.id)
    .then(function(orders) {
        res.send(orders);
    })
})

// Post request to users table.
app.post('/users', function(req, res) {
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

// Post request to products table.
app.post('/products', function(req, res) {
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

// Post request to orders table.
app.post('/orders', function(req, res) {
    knex('orders').insert({
        user_id: req.body.user_id,
        order_details: req.body.order_details
    })
    .then(function() {
        knex.select().from('orders')
        .then(function(orders) {
            res.send(orders);
        })
    })
})

// Put request to update user data.
app.put('/users/:id', function(req, res) {
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

// Put request to update product data.
app.put('/products/:id', function(req, res) {
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
app.delete('/products/:id', function(req, res) {
    knex('products').where('id', req.params.id)
    .del()
    .then(function() {
        knex.select().from('products')
        .then(function(products) {
            res.send(products);
        })
    })
})

// Delete request to delete an order.
app.delete('/orders/:id', function(req, res) {
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
app.get('/orders-of-user/:id', function(req, res) {
    knex.from('orders')
    .innerJoin('users', 'orders.user_id', 'users.id')
    .where('orders.user_id', req.params.id)
    .then(function(data) {
        res.send(data);
    })
})

app.listen(port, function() {
    console.log("listening on port: ", port);
})
