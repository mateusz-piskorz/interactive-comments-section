import { screen, render, waitFor } from "@testing-library/react";
import { CommentList } from "./index";
import { comments } from "../../../tests/constants";

jest.mock("../Comment", () => ({
  Comment: jest.fn(({ commentId }) => <h1>{commentId}</h1>),
}));

it("displays Comment List", () => {
  render(<CommentList comments={comments} nestingLevel={0} />);
  expect(screen.getByText(comments[0]._id)).toBeInTheDocument();
  expect(screen.getByText(comments[1]._id)).toBeInTheDocument();
});
