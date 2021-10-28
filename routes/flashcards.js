"use strict";

const express = require("express");
const Flashcards = require("../models/flashcards");
const {ensureLoggedIn, ensureCorrectUser} = require('../middleware/auth');
const router = express.Router();

router.get("/:tag", async function (req, res, next) {
    try {
      const tag = await Flashcards.findAll(req.params.tag);
      return res.json({ tag });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/user/:usercards", async function (req, res, next) {
    try {
      const usercards = await Flashcards.findUserFlashcards(req.params.usercards);
      return res.json({ usercards });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/create", async function (req, res, next) {
    try {
      const flashcards = await Flashcards.createFlashcard(req.body);
      return res.json({ flashcards });
    } catch (err) {
      return next(err);
    }
  });

  router.delete("/delete/:title", async function (req, res, next) {
    try {
      await Flashcards.remove(req.params.title);
      return res.json({ deleted: req.params.title });
    } catch (err) {
      return next(err);
    }
  });

  module.exports = router;