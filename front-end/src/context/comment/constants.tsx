import { Comment } from "../../types";

const exampleDate = new Date();

const defaultComment: Comment = {
  avatar: "avatar1",
  name: "",
  color: "teal",
  dislikes: [],
  likes: [],
  likesCount: 0,
  yourComment: false,
  content: "",
  _id: "",
  createdAt: exampleDate,
};

export const defaultState = {
  comments: [defaultComment],
  rootComments: [defaultComment],
  getReplies: () => [{ ...defaultComment, parentId: "" }],
};
