const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "postgres",
		port: process.env.DB_PORT,
	},
	test: {
		username: process.env.TEST_DB_USERNAME,
		password: process.env.TEST_DB_PASSWORD,
		database: process.env.TEST_DB_DATABASE,
		host: process.env.TEST_DB_HOST,
		dialect: "postgres",
		port: process.env.TEST_DB_PORT,
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "postgres",
		port: process.env.DB_PORT,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
