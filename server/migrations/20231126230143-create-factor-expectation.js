"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataYypes) {
    await queryInterface.createTable("factorExpectations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataYypes.INTEGER,
      },
      milestoneId: {
        type: DataYypes.INTEGER,
      },
      factorId: {
        type: DataYypes.INTEGER,
      },
      value: {
        type: DataYypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataYypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataYypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("factorExpectations");
  },
};
