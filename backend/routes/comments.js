import express from "express";
import { Comment } from "../models/comments.js";
import { User } from "../models/users.js";

export const router = express.Router();

// get all comments
router.post("/", async function (req, res) {
  const comments = await Comment.find().sort({ createdAt: "desc" }).lean();

  const filteredComments = comments.map((comment) => {
    if (comment.author == req.body.userId) {
      comment.yourComment = true;
    }
    delete comment.author;
    return comment;
  });

  res.send(filteredComments);
});

//create new comment
router.post("/add", async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    parentId: req.body.parentId,
    author: req.body.userId,
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
    author: "6569cd51ae0d895dc36c431d",
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
  });
  const newComment2 = new Comment({
    author: "6569cd51ae0d895dc36c431d",
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
