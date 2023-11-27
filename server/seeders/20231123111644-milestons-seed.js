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
      "milestones",
      [
        
        {
          id: 1,
          cohortId: 1,
          name: "Start",
          startDate: "2023-09-01T00:00:00.000Z",
          endDate: "2023-09-30T23:59:59.999Z",
          createdAt: "2023-09-01T00:00:00.000Z",
          updatedAt: "2023-09-01T00:00:00.000Z",
        },
        {
          id: 2,
          cohortId: 1,
          name: "HTML-CSS Week 1",
          startDate: "2023-10-01T00:00:00.000Z",
          endDate: "2023-10-30T23:59:59.999Z",
          createdAt: "2023-09-01T00:00:00.000Z",
          updatedAt: "2023-09-01T00:00:00.000Z",
        },
        {
          id: 3,
          cohortId: 1,
          name: "JS1 Week 1",
          startDate: "2023-10-31T00:00:00.000Z",
          endDate: "2023-11-29T23:59:59.999Z",
          createdAt: "2023-09-01T00:00:00.000Z",
          updatedAt: "2023-09-01T00:00:00.000Z",
        },
        {
          id: 4,
          cohortId: 1,
          name: "JS2 Week 1",
          startDate: "2023-11-30T00:00:00.000Z",
          endDate: "2023-12-29T23:59:59.999Z",
          createdAt: "2024-09-01T00:00:00.000Z",
          updatedAt: "2024-09-01T00:00:00.000Z",
        }
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
