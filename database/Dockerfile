FROM mongo:4.2.2

# MongoDB images are initialized with whichever scripts they find in the /docker-entrypoint-initdb.d/ folder.
# So, let's copy our "mongodb-init.js" script file to initialize the database.
COPY mongodb-init.js /docker-entrypoint-initdb.d/mongodb-init.js
