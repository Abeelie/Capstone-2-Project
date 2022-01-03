"use strict";
// Initializing the client from postgresql library 
const { Client } = require("pg");
// Initializing the getDatabaseURI
const { getDatabaseUri } = require("./config");
// Initializing the db variable 
let db;
/** if the node env is in production, 
 *  set db variable to the connectionString
 *  and set ssl rejectUnauthorized: false
*/
if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
  // else the node env is in development and set db variable to the connectionString
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

// connect the db
db.connect();

module.exports = db;