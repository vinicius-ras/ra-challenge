// Create a user for allowing the "complaints" service to access the database
db.createUser({
	user: "complaints_service",
	pwd: "complaints123",
	roles: [
		{ role: "readWrite", db: "ra_challenge" },
	],
});

// Create a user for allowing the "maps" service to access the database
db.createUser({
	user: "maps_service",
	pwd: "maps123",
	roles: [
		{ role: "readWrite", db: "ra_challenge" },
	],
});