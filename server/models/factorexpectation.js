"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FactorExpectation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Milestone, Factor, FactorAchievement }) {
      // define association here
      this.belongsTo(Milestone, { foreignKey: "milestoneId" });
      this.belongsTo(Factor, { foreignKey: "factorId" });
      this.hasOne(FactorAchievement, { foreignKey: "factorExpectationId" });
    }
  }
  FactorExpectation.init(
    {
      milestoneId: DataTypes.INTEGER,
      factorId: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "factorExpectations",
      modelName: "FactorExpectation",
    }
  );
  return FactorExpectation;
};
