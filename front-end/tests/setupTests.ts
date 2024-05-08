import "@testing-library/jest-dom";
import { user, comments } from "./constants";

jest.mock("../src/context/user", () => ({
  useUser: jest.fn(() => ({
    user,
  })),
}));

jest.mock("../src/context/comment", () => ({
  useComment: jest.fn((commentId: string) => {
    const comment = comments.find(({ _id }) => _id === commentId);
    const childComments = comments.filter(
      ({ parentId }) => parentId === commentId
    );
    return { comment, childComments };
  }),
}));
