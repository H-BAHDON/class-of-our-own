"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "factors",
      [
        {
          id: 1,
          name: "Codewars",
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 2,
          name: "Codility",
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 3,
          name: "Attendance",
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 4,
          name: "Pulls",
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
