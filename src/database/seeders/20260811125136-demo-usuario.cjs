'use strict';

const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: randomUUID(),
          name: 'João da Silva',
          email: 'joao@example.com',
          password_hash: '123456', // Se a sua coluna se chamar apenas 'password', mude o nome aqui
          admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
