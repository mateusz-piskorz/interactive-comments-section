import mongoose from "mongoose";
import { User } from "./users.js";
import Filter from "bad-words";
import words from "../bad-polish-words.js";

const filter = new Filter();
filter.addWords(...words);

const commentSchema = new mongoose.Schema(
  {
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
      required: true,
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
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    dislikes: {
      type: Array,
      default: [],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { minimize: false }
);

commentSchema.pre("save", { document: true }, async function (next) {
  try {
    const author = await User.findById(this.author._id);
    this.color = author.color;
    this.avatar = author.avatar;
    this.name = author.name;
    this.content = filter.clean(this.content);
  } catch (err) {
    next(err);
  }
});

export const Comment = mongoose.model("Comment", commentSchema);
