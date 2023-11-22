"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      traineeGithubAccount: {
        type: DataTypes.STRING,
        field: "T-github_account",
      },
      traineeCodwarsUsername: {
        type: DataTypes.STRING,
        field: "T-codewars_username",
      },
      traineeCodilityUsername: {
        type: DataTypes.STRING,
        field: "T-codility_username",
      },
      accessToken: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users");
  },
};
