'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('User',//ten model
    [
      {
     email: 'John Doe',
     password: '123',
     username: 'fakel1'
    },
    {
      email: 'John Doe2',
      password: '123',
      username: 'fakel2'
     },
     {
      email: 'John Doe3',
      password: '123',
      username: 'fakel3'
     }
  ], {});
  },


  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
