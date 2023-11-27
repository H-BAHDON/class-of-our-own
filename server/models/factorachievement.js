"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FactorAchievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, FactorExpectation }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(FactorExpectation, { foreignKey: "factorExpectationId" });
    }
  }
  FactorAchievement.init(
    {
      userId: DataTypes.INTEGER,
      factorExpectationId: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "factorAchievements",
      modelName: "FactorAchievement",
    }
  );
  return FactorAchievement;
};
