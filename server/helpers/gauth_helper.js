export function getClientId() {
	const clientId = process.env.CLIENT_ID;
	if (!clientId) {
		throw new Error("Client ID not found.");
	}
	return clientId;
}
