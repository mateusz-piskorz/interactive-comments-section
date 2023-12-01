import mongoose from "mongoose";

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

export const User = mongoose.model("User", usersSchema);
