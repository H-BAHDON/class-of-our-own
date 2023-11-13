import { createDatabaseUrl } from "./config";

describe("config", () => {
	describe("createDatabaseUrl", () => {
		test("returns the full db url from the parameters", () => {
			const result = createDatabaseUrl(
				null,
				"host",
				"name",
				"port",
				"password",
				"username"
			);
			expect(result).toEqual("postgres://username:password@host:port/name");
		});

		test("returns the the given full db url", () => {
			const result = createDatabaseUrl(
				"postgres://username1:password1@host1:port1/name1",
				"host",
				"name",
				"port",
				"password",
				"username"
			);
			expect(result).toEqual(
				"postgres://username1:password1@host1:port1/name1"
			);
		});
	});
});
