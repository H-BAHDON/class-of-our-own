"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cohort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Milestone }) {
      // define association here
      this.hasMany(Milestone, { foreignKey: "cohortId" });
      this.hasMany(User, { foreignKey: "cohortId" });
    }
  }
  Cohort.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "cohorts",
      modelName: "Cohort",
    }
  );
  return Cohort;
};
