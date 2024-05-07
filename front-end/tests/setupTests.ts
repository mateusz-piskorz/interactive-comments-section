import "@testing-library/jest-dom";
import {
  user,
  comments,
  rootComments,
  getReplies,
  getCommentById,
} from "./constants";

jest.mock("../src/context/user", () => ({
  useUser: jest.fn(() => ({
    user,
  })),
}));

jest.mock("../src/context/comment", () => ({
  useComment: jest.fn(() => ({
    comments,
    rootComments,
    getReplies,
    getCommentById,
  })),
}));
