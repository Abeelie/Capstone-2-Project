"use strict";

const db = require("../db.js");
const Flashcards = require("../models/flashcards");
const User = require("../models/user");

async function commonBeforeAll() {
  await db.query("DELETE FROM flashcards");

  await User.register({
    username: "u4",
    firstName: "U4F",
    lastName: "U4L",
    email: "user4@user.com",
    password: "password4",
  });

  await Flashcards.createFlashcard({
    title: "Coding", 
    question: "What is coding", 
    answer: "A skill used to develop software", 
    username: "u4", 
    tag: "code"
  })

  await Flashcards.createFlashcard({
    title: "Coding1", 
    question: "What is coding", 
    answer: "A skill used to develop software", 
    username: "u4", 
    tag: "code1"
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
}