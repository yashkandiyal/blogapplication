const express = require("express");
const User = require("./../models/User.js");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const sendData = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    console.log(sendData);
    res.status(200).json({ msg: "all success!" });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "error in receiving data from register route", error });
  }
});

module.exports = router;
