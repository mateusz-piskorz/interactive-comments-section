import express from "express";
import { Comment } from "../../models/comments.js";
import { User } from "../../models/users.js";
import { io } from "../../server.js";
import { limitTime } from "./middleware.js";

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

// add a comment
router.post("/add", limitTime("post"), async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    parentId: req.body.parentId,
    author: req.body.userId,
  });

  try {
    const newComment = await comment.save();
    io.emit("comment-added", { comment: newComment });
    res.send(newComment);
  } catch (err) {
    console.log(err);
    res.send("error adding comment");
  }
});

// like
router.post("/like", limitTime("like"), async (req, res) => {
  const { userId, commentId } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    const indexOf = comment.likes.indexOf(userId);
    if (indexOf == -1) {
      comment.likes = [...comment.likes, userId];
    } else {
      comment.likes.splice(indexOf, 1);
    }

    comment.likesCount = +comment.likes.length - +comment.dislikes.length;
    const updatedComment = await comment.save();
    io.emit("comment-edited", { comment: updatedComment });
    res.status(200).send({ message: "like added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error adding like", error });
  }
});

// dislike
router.post("/dislike", limitTime("like"), async (req, res) => {
  const { userId } = req.body;
  try {
    const comment = await Comment.findById(req.body.commentId);
    const indexOf = comment.dislikes.indexOf(userId);
    if (indexOf !== -1) {
      comment.dislikes.splice(indexOf, 1);
    } else {
      comment.dislikes = [...comment.dislikes, userId];
    }
    comment.likesCount = +comment.likes.length - +comment.dislikes.length;
    const updatedComment = await comment.save();
    io.emit("comment-edited", { comment: updatedComment });
    res.status(200).send({ message: "dislike added successfully" });
  } catch (error) {
    res.status(500).send({ message: "error adding dislike", error });
  }
});

// remove all
router.get("/removeAll", async (req, res) => {
  try {
    await Comment.deleteMany({});
    res.send("success");
  } catch (err) {
    res.send(500);
    res.send({ message: "error removing all" });
  }
});

// get single comment
router.post("/:id", async function (req, res) {
  const comment = await Comment.findById(req.params.id).lean();
  if (comment.author == req.body.userId) {
    comment.yourComment = true;
  }
  delete comment.author;
  res.send(comment);
});

//edit a comment
router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    comment.content = req.body.content;
    const updatedComment = await comment.save();
    io.emit("comment-edited", { comment: updatedComment });
    res.send(updatedComment);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

// delete one
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const comment = await Comment.findById(req.params.id);
    const childComment = await Comment.findOne({
      parentId: req.params.id,
    }).exec();
    if (user?._id?.toHexString() == comment?.author?.toHexString()) {
      if (!childComment) {
        await Comment.deleteOne({ _id: comment._id });
        io.emit("comment-removed", { commentId: comment._id });
        res.send({ message: "success" });
      } else {
        res.status(400);
        res.send({ message: "you cannot delete a comment that has replies" });
      }
    } else {
      res.status(401);
      res.send({ message: "unauthorized" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "error removing a comment" });
  }
});
