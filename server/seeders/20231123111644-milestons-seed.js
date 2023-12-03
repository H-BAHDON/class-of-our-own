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
          name: "START",
          startDate: "2023-01-14T00:00:00.000Z",
          endDate: "2023-01-20T23:59:59.999Z",
          createdAt: "2023-09-01T00:00:00.000Z",
          updatedAt: "2023-09-01T00:00:00.000Z",
        },
        {
          id: 2,
          cohortId: 1,
          name: "HTML-CSS 1",
          startDate: "2023-01-21T00:00:00.000Z",
          endDate: "2023-02-17T23:59:59.999Z",
          createdAt: "2023-09-01T00:00:00.000Z",
          updatedAt: "2023-09-01T00:00:00.000Z",
        },
        {
          id: 3,
          cohortId: 1,
          name: "JS1 Week 1",
          startDate: "2023-02-18T00:00:00.000Z",
          endDate: "2023-03-17T23:59:59.999Z",
          createdAt: "2023-09-01T00:00:00.000Z",
          updatedAt: "2023-09-01T00:00:00.000Z",
        },
        {
          id: 4,
          cohortId: 1,
          name: "JS2 Week 1",
          startDate: "2023-03-18T00:00:00.000Z",
          endDate: "2023-05-12T23:59:59.999Z",
          createdAt: "2024-09-01T00:00:00.000Z",
          updatedAt: "2024-09-01T00:00:00.000Z",
        },
        {
          id: 5,
          cohortId: 1,
          name: "JS3 Week 3",
          startDate: "2023-05-13T00:00:00.000Z",
          endDate: "2023-06-16T23:59:59.999Z",
          createdAt: "2024-09-01T00:00:00.000Z",
          updatedAt: "2024-09-01T00:00:00.000Z",
        },
        {
          id: 6,
          cohortId: 1,
          name: "React Week 2",
          startDate: "2023-06-17T00:00:00.000Z",
          endDate: "2023-07-21T23:59:59.999Z",
          createdAt: "2024-09-01T00:00:00.000Z",
          updatedAt: "2024-09-01T00:00:00.000Z",
        },
        {
          id: 7,
          cohortId: 1,
          name: "Node Week 2",
          startDate: "2023-07-22T00:00:00.000Z",
          endDate: "2023-09-08T23:59:59.999Z",
          createdAt: "2024-09-01T00:00:00.000Z",
          updatedAt: "2024-09-01T00:00:00.000Z",
        },
        {
          id: 8,
          cohortId: 1,
          name: "DB Week 3",
          startDate: "2023-09-09T00:00:00.000Z",
          endDate: "2023-11-17T23:59:59.999Z",
          createdAt: "2024-09-01T00:00:00.000Z",
          updatedAt: "2024-09-01T00:00:00.000Z",
        },
        {
          id: 9,
          cohortId: 1,
          name: "Final Projects Week 2",
          startDate: "2023-11-18T00:00:00.000Z",
          endDate: "2024-01-04T23:59:59.999Z",
          createdAt: "2024-09-01T00:00:00.000Z",
          updatedAt: "2024-09-01T00:00:00.000Z",
        },
        {
          id: 10,
          cohortId: 1,
          name: "Post Grad",
          startDate: "2024-01-05T00:00:00.000Z",
          endDate: "2024-01-28T23:59:59.999Z",
          createdAt: "2024-09-01T00:00:00.000Z",
          updatedAt: "2024-09-01T00:00:00.000Z",
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
