const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	development: {
	  url: process.env.DATABASE_URL,
	  dialect: "postgres",
	  port: process.env.PORT,
	},
	test: {
	  url: process.env.TEST_DATABASE_URL,
	  dialect: "postgres",
	  port: process.env.PORT,
	},
	production: {
	  url: process.env.DATABASE_URL,
	  dialect: "postgres",
	  port: process.env.PORT,
	  dialectOptions: {
		ssl: {
		  require: true,
		  rejectUnauthorized: false,
		},
	  },
	},
  };