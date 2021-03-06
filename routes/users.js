"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureCorrectUser, ensureLoggedIn} = require("../middleware/auth");
const { BadRequestError } = require("../helpers/expressError");
const User = require("../models/user");
const userUpdateSchema = require("../schemas/userUpdate.json");
const router = express.Router();

// testing purposes
// router.get("/", async function (req, res, next) {
//     try {
//       const users = await User.findAll();
//       return res.json({ users });
//     } catch (err) {
//       return next(err);
//     }
//   });


router.get("/:username", ensureLoggedIn, async function (req, res, next) {
  try {
    const user = await User.getUsername(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:username", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


router.delete("/:username", ensureLoggedIn, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});



module.exports = router;
