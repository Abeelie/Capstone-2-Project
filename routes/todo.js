"use strict";

const express = require("express");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const Todo = require("../models/todo");
const router = express.Router();

router.get("/:username", async function (req, res, next) {
    try {
      const todo = await Todo.findAll(req.params.username);
      return res.json({ todo });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/create", async function (req, res, next) {
    try {
      const todo = await Todo.createTodo(req.body);
      return res.json({ todo });
    } catch (err) {
      return next(err);
    }
  });

  router.delete("/delete/:note", async function (req, res, next) {
    try {
      await Todo.remove(req.params.note);
      return res.json({ deleted: req.params.note });
    } catch (err) {
      return next(err);
    }
  });

  module.exports = router;