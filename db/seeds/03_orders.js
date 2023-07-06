/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        { id: 1,
          user_id: 1,
          order_details: {
            product: 'Apple',
            quantity: 2
          }
        },
        { id: 2,
          user_id: 1,
          order_details: {
            product: 'Pineapple',
            quantity: 2
          }
        },
      ]);
    });
};
