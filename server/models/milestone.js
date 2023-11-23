"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cohort }) {
      // define association here
      this.belongsTo(Cohort, { foreignKey: "cohrtId" });
    }
  }
  Milestone.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "milestons",
      modelName: "Milestone",
    }
  );
  return Milestone;
};
