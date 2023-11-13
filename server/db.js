import { Pool } from "pg";

import config from "./utils/config";
import logger from "./utils/logger";

const connectString = "postgres://hitqxlam:FB6ehdUSea57ORwwx8hkNB_Rda1uRw0h@flora.db.elephantsql.com/hitqxlam"

const pool = new Pool({
	connectionString: connectString,
	connectionTimeoutMillis: 5000,
    ssl: false,
});

/* 
const pool = new Pool({
	connectionString: config.dbUrl,
	connectionTimeoutMillis: 5000,
    ssl: false,
});
*/

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		logger.error("%O", err);
		process.exit(1);
	}
	logger.info("Postgres connected to %s", client.database);
	client.release();
};

export const disconnectDb = () => pool.end();
