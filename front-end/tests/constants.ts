export const user = {
  avatar: "avatar1",
  color: "purple",
  name: "testUser",
  _id: "testUserId",
};

const createdAt = new Date();

export const comment1 = {
  avatar: "avatar1",
  color: "purple",
  content: "comment content",
  createdAt,
  dislikes: [],
  likes: [],
  likesCount: 5,
  name: "test name",
  yourComment: false,
  _id: "commentIdTest",
  parentId: "root",
};

export const comment2 = {
  avatar: "avatar2",
  color: "red",
  content: "comment content2",
  createdAt,
  dislikes: [],
  likes: [],
  likesCount: 10,
  name: "test name2",
  yourComment: false,
  _id: "commentIdTest2",
  parentId: comment1._id,
};

export const comments = [comment1, comment2];
