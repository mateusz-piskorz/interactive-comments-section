import express from "express";
import { User } from "../models/users.js";

export const router = express.Router();

// get a user
router.post("/", async function (req, res) {
  try {
    const user = await User.findById(req.body.userId);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

//create new user
router.post("/add", async (req, res) => {
  const user = new User({
    avatar: req.body.avatar,
    name: req.body.name,
    color: req.body.color,
  });

  try {
    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    res.send(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user === null) {
      res.status(404);
      res.send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404);
    res.send("user not found");
  }
});
