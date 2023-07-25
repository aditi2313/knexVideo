# Knex Project Invansys

For the project we will be making an online ordering app with knex, nodejs, postgres and postman (postman for running our crud endpoints get/post/put/delete requests),
You can either proceed with 3 table structure (tables - user, order details, product) or can implement a 4 table one (tables-user, order, order details, product).

User (id, name, email, password, address)

Order (id, userId, orderdetails (if you are using a 4 table structure you can make separate table for orderdetails with relevant columns, in this case of 3 tables you can store orderdetails in a jsonb format)) 

Product (id, name, price, units available)

You can modify this schema but make sure to use postgis datatypes, jsonb and other things with you have studied before.
After defining the structure the app should be able to perform the following operations.

# CRUD ENDPOINTS:
1. Get request from all the tables
2. Get by Id requests from all the tables
3. Post requests to all tables
4. Updating user and product table data
5. Necessary authentication on user table (you can also implement jwt token based authentication to make sure only a authenticated user is able to view to only his orders and update only his details).
