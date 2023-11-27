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
      "factorExpectations",
      [
        {
          id: 1,
          milestoneId: 1,
          factorId: 1,
          value: 9,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 2,
          milestoneId: 1,
          factorId: 2,
          value: 0,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 3,
          milestoneId: 1,
          factorId: 3,
          value: 100,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 4,
          milestoneId: 1,
          factorId: 4,
          value: 0,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 5,
          milestoneId: 2,
          factorId: 1,
          value: 9,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 6,
          milestoneId: 2,
          factorId: 2,
          value: 0,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 7,
          milestoneId: 2,
          factorId: 3,
          value: 100,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 8,
          milestoneId: 2,
          factorId: 4,
          value: 3,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 9,
          milestoneId: 3,
          factorId: 1,
          value: 8,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 10,
          milestoneId: 3,
          factorId: 2,
          value: 2,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 11,
          milestoneId: 3,
          factorId: 3,
          value: 100,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 12,
          milestoneId: 3,
          factorId: 4,
          value: 4,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 13,
          milestoneId: 3,
          factorId: 1,
          value: 7,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 14,
          milestoneId: 3,
          factorId: 2,
          value: 2,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 15,
          milestoneId: 3,
          factorId: 3,
          value: 95,
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 16,
          milestoneId: 3,
          factorId: 4,
          value: 9,
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
