import { Comment } from "./types";

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
  writingArr: undefined,
  setCanIAddComment: () => {},
  canIAddComment: true,
  userDetails: { avatar: "avatar1", color: "", name: "", _id: "" } as const,
  comments: [defaultComment],
  rootComments: [defaultComment],
  getReplies: () => [{ ...defaultComment, parentId: "" }],
};
