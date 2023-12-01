import express from "express";
import { Comment } from "../models/comments.js";

export const router = express.Router();

// get all comments
router.get("/", async function (req, res) {
  // lean() methods coverts to javascript object;
  const comments = await Comment.find().sort({ createdAt: "desc" }).lean();

  comments[0].parentId;
  res.send(["gi"]);
});

//create new comment
router.post("/add", async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    parentId: req.body.parentId,
  });

  try {
    const newComment = await comment.save();
    res.send(newComment);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

// delete all data
router.get("/removeall", async (req, res) => {
  const newComment = new Comment({
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
  });
  const newComment2 = new Comment({
    content:
      "If you're still new. i'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. it's very tempting to jump ahead but lay a sold foundation first.",
  });

  try {
    await Comment.deleteMany({});
    await newComment.save();
    await newComment2.save();
    res.send("succes");
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});
