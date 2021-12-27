"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Flashcards = require("../models/flashcards");
const Todo = require("../models/todo");
const { createToken } = require("./tokens");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM flashcards");
  await db.query("DELETE FROM todo");

  await User.register({
    username: "u0",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
  });
  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
  });

  await Flashcards.createFlashcard({
    title: "Coding", 
    question: "What is coding", 
    answer: "A skill used to develop software", 
    username: "u3", 
    tag: "code"
  })

  await Flashcards.createFlashcard({
    title: "Coding1", 
    question: "What is coding", 
    answer: "A skill used to develop software", 
    username: "u2", 
    tag: "code1"
  })
  
  await Todo.createTodo({
    note: "test", 
    username: "u3"
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


const u3Token = createToken({ username: "u3"});


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u3Token
};