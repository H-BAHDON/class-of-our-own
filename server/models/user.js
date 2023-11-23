"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cohort }) {
      this.belongsTo(Cohort, { foreignKey: "cohortId" });
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
      },
      traineeCodwarsUsername: {
        type: DataTypes.STRING,
      },
      traineeCodilityUsername: {
        type: DataTypes.STRING,
      },
      accessToken: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      cohortId: {
        type: DataTypes.INTEGER,
        references: {
          model: "cohorts",
          key: "id",
        },
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
