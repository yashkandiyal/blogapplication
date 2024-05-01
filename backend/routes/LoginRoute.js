import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
const privateKey = process.env.SECRET_KEY;
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDetails = await User.findOne({ username });
    const isPasswordPresent = bcrypt.compareSync(
      password,
      userDetails.password
    );
    console.log(isPasswordPresent);
    if (isPasswordPresent) {
      //user is logged in
      jwt.sign(
        { username, id: userDetails._id },

        "privateKey",
        {},
        (err, token) => {
          if (err) throw err;
          console.log(token);
          res.cookie("token", token).json("ok");
        }
      );
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in fetching login credentials from frontend" });
  }
});

export default router;
