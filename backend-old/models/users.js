import mongoose from "mongoose";
import Filter from "bad-words";
import words from "../bad-polish-words.js";

const filter = new Filter();
filter.addWords(...words);

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

usersSchema.pre("save", { document: true }, async function (next) {
  try {
    this.name = filter.clean(this.name);
  } catch (err) {
    next(err);
  }
});

export const User = mongoose.model("User", usersSchema);
