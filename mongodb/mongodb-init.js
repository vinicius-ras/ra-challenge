// Create a user for allowing the API to access the database
db.createUser({
	user: "api",
	pwd: "abc123",
	roles: [
		{ role: "readWrite", db: "ra_challenge" },
	],
});