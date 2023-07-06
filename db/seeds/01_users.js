/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'Alex', email: 'test1@test.com', password: 'password1', address: 'address1'},
        { id: 2, name: 'Blare', email: 'test2@test.com', password: 'password2', address: 'address2'},
        { id: 3, name: 'Cion', email: 'test3@test.com', password: 'password3', address: 'address3'},
      ]);
    });
};
