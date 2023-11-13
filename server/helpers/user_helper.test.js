const { connectDb, disconnectDb } = require("../db");
const {
	saveUser,
	truncateUsers,
	findUserByEmail,
	deleteUser,
} = require("./user_helper");
const { Users, Tokens } = require("../models");

describe("user_helper", () => {
	beforeAll(async () => {
		await connectDb();
	});

	afterAll(async () => {
		await disconnectDb();
	});

	beforeEach(async () => {
		await truncateUsers();
	});

	describe("deleteUser", () => {
		test("it deletes the user and all tokens", async () => {
			await saveUser("name", "bob@email.com", "role", "token");
			await deleteUser("token");
			expect(await Users.count()).toEqual(0);
			expect(await Tokens.count()).toEqual(0);
		});
	});

	describe("saveUser", () => {
		test("it saves the user", async () => {
			await saveUser("name", "bob@email.com", "role", "token");
			let user = await findUserByEmail("bob@email.com");
			expect(user.email).toEqual("bob@email.com");
		});

		test("it does not make a new user when one already exists", async () => {
			await saveUser("name", "bob@email.com", "role", "token");
			await saveUser("name", "bob@email.com", "role", "token");
			expect(await Users.count()).toEqual(1);
		});

		test("it saves the unique tokens", async () => {
			await saveUser("name", "bob@email.com", "role", "token1");
			await saveUser("name", "bob@email.com", "role", "token2");
			expect(await Tokens.count()).toEqual(2);
		});
	});
});
