"use strict";
// lightweight npm package that automatically loads environment variables
require("dotenv").config();
// requiring colors
require("colors");

// Initializing the SECRET_KEY
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
// SECRET_KEY the PORT
const PORT = +process.env.PORT || 5000;
// SECRET_KEY the getDatabaseUri function to return the state of the node env
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "aistudy_test"
      : process.env.DATABASE_URL || "aistudy";
}

// Initializing the BCRYPT_WORK_FACTOR
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

// console log the env vars
console.log("aistudy Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
