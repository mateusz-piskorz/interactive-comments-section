import { Comment } from "../src/types";

export const user = {
  avatar: "avatar1",
  color: "purple",
  name: "testUser",
  _id: "testUserId",
};

const createdAt = new Date();

export const comment1: Comment = {
  author: {
    avatar: "avatar1",
    id: "authorId1",
    username: "userName1",
    color: "teal",
  },
  id: "comment1Id",
  content: "comment content",
  createdAt,
  dislikes: [],
  likes: [],
  likesCount: 5,

  parentId: "root",
};

export const comment2: Comment = {
  author: {
    avatar: "avatar2",
    id: "authorId2",
    username: "userName2",
    color: "pink",
  },
  id: "comment2Id",
  content: "comment content2",
  createdAt,
  dislikes: [],
  likes: [],
  likesCount: 10,

  parentId: comment1.id,
};

export const comments = [comment1, comment2];
