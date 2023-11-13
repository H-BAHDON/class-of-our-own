const { Users, Tokens } = require("../models");
import logger from "./../utils/logger";

export async function saveUser(name, email, role, token) {
	const user = await Users.findOne({ where: { email } });
	if (!user) {
		logger.debug(`User not fond for: ${email}, creating new user`);
		const newUser = await Users.create({ name, email, role });
		await Tokens.create({ token, user_id: newUser.id });
	} else {
		let currentToken = await Tokens.findOne({ where: { token } });
		if (!currentToken) {
			logger.debug(`Updating token for: ${email}`);
			await Tokens.create({ token, user_id: user.id });
		}
	}
}

export async function findUserByEmail(email) {
	return await Users.findOne({ where: { email } });
}

export async function truncateUsers() {
	await Users.truncate({ cascade: true, restartIdentity: true });
}

export async function deleteUser(token) {
	const latestToken = await Tokens.findOne({ where: { token } });
	if (!latestToken) {
		return false;
	} else {
		await Tokens.destroy({ where: { user_id: latestToken.user_id } });
		await Users.destroy({ where: { id: latestToken.user_id } });
		return true;
	}
}
