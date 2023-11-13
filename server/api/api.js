import { Router } from "express";

const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
import logger from "./../utils/logger";
import { saveUser, deleteUser } from "./../helpers/user_helper";

dotenv.config();

const router = Router();

router.get("/health", (_, res) => {
	logger.info("Calling health endpoint");
	try {
		let serverOk = true;
		let dbOk = true;

		res.json({ serverOk, dbOk }).status(200);
	} catch (error) {
		logger.error("Error fetching clientId:", error.message);
		res.status(500).json({ error });
	}
});

router.get("/clientId", (_, res) => {
	try {
		const clientId = process.env.CLIENT_ID;
		if (!clientId) {
			throw new Error("Client ID not found.");
		}
		res.json({ clientId }).status(200);
	} catch (error) {
		logger.error("Error fetching clientId:", error.message);
		res.status(500).json({ error });
	}
});

router.post("/validation", async (req, res) => {
	const { token, role } = req.body;
	if (!token) {
		res.status(400).json({ error: "Missing token!" });
		return;
	}
	try {
		const client = new OAuth2Client();
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});
		const payload = ticket.getPayload();
		const { name, email } = payload;
		await saveUser(name, email, role, token);
		res.status(200).json({ message: "success!" });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: "Invalid token!" });
	}
});

router.delete("/profile", async (req, res) => {
	try {
		const { token } = req.body;
		if (!token) {
			res.status(400).json({ error: "Missing token!" });
		} else {
			if (await deleteUser(token)) {
				res.status(200).json({ message: "Your account is deleted!" });
			} else {
				res.status(404).json({ error: "Token not found" });
			}
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error });
	}
});

export default router;
