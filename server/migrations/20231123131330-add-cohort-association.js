"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "cohortId", {
      type: Sequelize.INTEGER,
      references: {
        model: "cohorts",
        key: "id",
      },
    });

    await queryInterface.addIndex("users", ["cohortId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "cohortId");
    await queryInterface.removeIndex("users", ["cohortId"]);
  },
};
