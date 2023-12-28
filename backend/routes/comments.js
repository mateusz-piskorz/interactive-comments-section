import express from "express";
import { Comment } from "../models/comments.js";
import { User } from "../models/users.js";
import { io } from "../server.js";

export const router = express.Router();

// get all comments
router.post("/", async function (req, res) {
  const comments = await Comment.find().sort({ createdAt: "asc" }).lean();

  const filteredComments = comments.map((comment) => {
    if (comment.author == req.body.userId) {
      comment.yourComment = true;
    }
    delete comment.author;
    return comment;
  });

  res.send(filteredComments);
});

// get single comment
router.post("/one-comment", async function (req, res) {
  const comment = await Comment.findById(req.body.commentId).lean();
  if (comment.author == req.body.userId) {
    comment.yourComment = true;
  }
  delete comment.author;
  res.send(comment);
});

const lastPostAddedArray = {};
//add a comment
router.post("/add", async (req, res) => {
  let canAddPost = false;
  if (lastPostAddedArray[req.body.userId]) {
    const diff = Date.now() - lastPostAddedArray[req.body.userId];
    if (diff >= 60000) {
      canAddPost = true;
    }
  } else {
    canAddPost = true;
  }

  if (canAddPost) {
    const comment = new Comment({
      content: req.body.content,
      parentId: req.body.parentId,
      author: req.body.userId,
    });

    try {
      const newComment = await comment.save();
      io.emit("new-comment-added", { commentId: newComment._id });
      lastPostAddedArray[req.body.userId] = Date.now();
      res.send(newComment);
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  } else {
    res.status(400);
    res.send("Hold Your Horses!");
  }
});

//edit a comment
router.put("/edit", async (req, res) => {
  try {
    const comment = await Comment.findById(req.body.commentId);
    comment.content = req.body.content;
    const updatedComment = await comment.save();
    io.emit("comment-edited", { commentId: updatedComment._id });
    res.send(updatedComment);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

//add a like
const lastLikeAddedArray = {};
router.post("/likes", async (req, res) => {
  let canAddLike = false;
  if (lastLikeAddedArray[req.body.userId]) {
    const diff = Date.now() - lastLikeAddedArray[req.body.userId];
    if (diff >= 60000) {
      canAddLike = true;
    }
  } else {
    canAddLike = true;
  }

  if (canAddLike) {
    try {
      const comment = await Comment.findById(req.body.commentId);
      comment.likes = { ...comment.likes, [req.body.userId]: req.body.like };
      const updatedComment = await comment.save();
      lastLikeAddedArray[req.body.userId] = Date.now();
      io.emit("comment-edited", { commentId: updatedComment._id });
      res.send(updatedComment);
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  } else {
    res.status(400);
    res.send("Hold Your Horses!");
  }
});

// delete one
router.post("/remove", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const comment = await Comment.findById(req.body.commentId);
    const childComment = await Comment.findOne({
      parentId: req.body.commentId,
    }).exec();
    if (user?._id?.toHexString() == comment?.author?.toHexString()) {
      if (!childComment) {
        await Comment.deleteOne({ _id: comment._id });
        io.emit("comment-removed", { commentId: comment._id });
        res.send("success");
      } else {
        res.status(400);
        res.send("you cannot delete a comment that has replies");
      }
    } else {
      res.status(401);
      res.send("unauthorized");
    }
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});
