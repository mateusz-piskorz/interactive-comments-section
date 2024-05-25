import "@testing-library/jest-dom";
import { user, comments } from "./constants";

jest.mock("../src/features/Auth/context", () => ({
  useUser: jest.fn(() => ({
    user,
    userId: user._id,
  })),
}));
jest.mock("../src/socket", () => ({
  socket: { emit: jest.fn() },
}));

jest.mock("../src/context/comment", () => ({
  useComment: jest.fn((commentId: string) => {
    const comment = comments.find(({ id }) => id === commentId);
    const childComments = comments.filter(
      ({ parentId }) => parentId === commentId
    );
    return { comment, childComments, addComment: jest.fn() };
  }),
}));
