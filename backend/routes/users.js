import express from "express";
import { User } from "../models/users.js";

export const router = express.Router();

// get a user
router.post("/", async function (req, res) {
  try {
    const user = await User.findById(req.body.userId);
    if (user) {
      res.send(user);
    } else {
      res.status(400).send({ message: "user not found" });
    }
  } catch (err) {
    res.status(400).send(err);
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

// remove all
router.get("/removeAll", async (req, res) => {
  try {
    await User.deleteMany({});
    res.send("success");
  } catch (err) {
    res.send(500);
    res.send({ message: "error removing all" });
  }
});
