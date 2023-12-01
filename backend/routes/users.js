import express from "express";
import { User } from "../models/users.js";

export const router = express.Router();

// get a user
router.post("/", async function (req, res) {
  try {
    const user = await User.findById(req.body.id);
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
  });

  try {
    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    res.send(err);
  }
});

// delete all data
router.get("/removeall", async (req, res) => {
  try {
    await User.deleteMany({});
    res.send("succes");
  } catch (err) {
    console.log(err);
    res.send(error);
  }
});
