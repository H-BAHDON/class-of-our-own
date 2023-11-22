"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
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
        field: "T-github",
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
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
