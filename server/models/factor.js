"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Factor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.FactorExpectation, { foreignKey: "factorId" });
    }
  }

  Factor.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "factors",
      modelName: "Factor",
    }
  );

  return Factor;
};
