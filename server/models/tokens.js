"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Tokens extends Model {
		/* eslint-disable-next-line */
		static associate(models) {}
	}

	Tokens.init(
		{
			token: DataTypes.TEXT,
			user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Tokens",
		}
	);
	return Tokens;
};
