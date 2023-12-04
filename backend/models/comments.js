import mongoose from "mongoose";
import { User } from "./users.js";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  yourComment: {
    type: Boolean,
    required: true,
    default: false,
  },
  color: {
    type: String,
  },
  authorAvatar: {
    type: String,
  },
  authorName: {
    type: String,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
});

commentSchema.pre("save", { document: true }, async function (next) {
  try {
    const author = await User.findById(this.author._id);
    this.color = author.color;
    this.authorAvatar = author.avatar;
    this.authorName = author.name;
  } catch (err) {
    next(err);
  }
});

export const Comment = mongoose.model("Comment", commentSchema);
