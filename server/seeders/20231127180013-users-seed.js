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
      "users",
      [
        {
          id: 1,
          cohortId: 1,
          name: "Seyyednavid Hejazijouybari",
          email: "seyyednavidhejazijouybari@gmail.com",
          role: "trainee",
          traineeGithubAccount: "100324062",
          traineeCodwarsUsername: "Seyyednavid",
          traineeCodilityUsername: "Seyyednavid",
          accessToken: "",
          refreshToken: "",
          createdAt: "2023-11-26T15:30:00.000Z",
          updatedAt: "2023-11-26T15:30:00.000Z",
        },
        {
          id: 2,
          cohortId: 1,
          name: "Hussein Bahdon",
          email: "husseinbahdon1@gmail.com",
          role: "trainee",
          traineeGithubAccount: "35459369",
          traineeCodwarsUsername: "Hussein-Bahdon",
          traineeCodilityUsername: "Hussein-Bahdon",
          accessToken: "",
          refreshToken: "",
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