import { Comment } from "./types";

const exampleDate = new Date();

const defaultComment: Comment = {
  authorAvatar: "avatar1",
  authorName: "",
  color: "",
  likes: { authorIdTest: "plus" },
  yourComment: false,
  content: "",
  _id: "",
  createdAt: exampleDate,
};

export const defaultState = {
  writingArr: undefined,
  countDown: <></>,
  setCanIAddComment: () => {},
  canIAddComment: true,
  userDetails: { avatar: "avatar1", color: "", name: "", _id: "" } as const,
  comments: [defaultComment],
  rootComments: [defaultComment],
  getReplies: () => [{ ...defaultComment, parentId: "" }],
};
