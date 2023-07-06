/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { id: 1,
          name: 'Milk',
          price: 1,
          units_available: 10,
        },
        { id: 2,
          name: 'Apple',
          price: 2,
          units_available: 20,
        },
        { id: 3,
          name: 'Cheese',
          price: 3,
          units_available: 30,
        },
        { id: 4,
          name: 'Pineapple',
          price: 4,
          units_available: 40,
        },
        { id: 5,
          name: 'Headphones',
          price: 5,
          units_available: 50,
        },
      ]);
    });
};
