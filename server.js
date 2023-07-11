const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8001;
const usersRouter = require('./users');
const productsRouter = require('./products');
const ordersRouter = require('./orders');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// Use the routers for each request type
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.listen(port, function() {
    console.log("listening on port: ", port);
})
