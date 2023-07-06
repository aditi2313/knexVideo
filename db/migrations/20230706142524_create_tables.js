/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('address').notNullable();
    })
    .createTable('products', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.integer('price').notNullable();
        table.integer('units_available').notNullable();
    })
    .createTable('orders', function(table) {
        table.increments();
        table.integer('user_id').references('id').inTable('users');
        table.jsonb('order_details').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users').dropTable('products').dropTable('orders');
};
