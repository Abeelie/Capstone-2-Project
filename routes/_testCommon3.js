"use strict";

const db = require("../db.js");
const Todo = require("../models/todo");
const User = require("../models/user");


async function commonBeforeAll() {
  await db.query("DELETE FROM todo");

  await User.register({
    username: "u5",
    firstName: "U5F",
    lastName: "U5L",
    email: "user5@user.com",
    password: "password5",
  });
  
  await Todo.createTodo({
    note: "test", 
    username: "u5"
  })
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};