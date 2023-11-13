import "dotenv/config";

// Reusing the sequalize config
import { development, test } from "../config/config";

export function createDatabaseUrl(
	full_url,
	host,
	name,
	port,
	password,
	username
) {
	if (full_url) {
		return full_url;
	}
	const userinfo = `${username}:${password}`;
	return `postgres://${
		userinfo !== ":" ? `${userinfo}@` : ""
	}${host}:${port}/${name}`;
}

let dbUrlDevelopment = createDatabaseUrl(
	process.env.DATABASE_URL,
	development.host,
	development.database,
	development.port,
	development.password,
	development.username
);

let dbUrlTest = createDatabaseUrl(
	process.env.TEST_DATABASE_URL,
	test.host,
	test.database,
	test.port,
	test.password,
	test.username
);

function getDbForEnv(env) {
	if (env == "development") {
		return dbUrlDevelopment;
	}
	if (env == "test") {
		return dbUrlTest;
	}
	return process.env.DATABASE_URL || "";
}
function getLogLevelForEnv(env) {
	if (env == "development") {
		return process.env.LOG_LEVEL;
	}
	if (env == "test") {
		return process.env.TEST_LOG_LEVEL;
	}
	return process.env.LOG_LEVEL ?? "info";
}

function getPortForEnv(env) {
	if (env == "development") {
		return process.env.PORT;
	}
	if (env == "test") {
		return process.env.PORT;
	}
	return process.env.PORT ?? "3000";
}

export default {
	dbUrl: getDbForEnv(process.env.NODE_ENV),
	logLevel: getLogLevelForEnv(process.env.NODE_ENV),
	port: parseInt(getPortForEnv(process.env.NODE_ENV), 10),
	production: process.env.NODE_ENV === "production",
};
