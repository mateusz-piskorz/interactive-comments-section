import { screen, render } from "@testing-library/react";
import { CommentList } from "./index";
import { comments } from "../../../tests/constants";

const CommentProps = jest.fn();
jest.mock("../Comment", () => ({
  Comment: jest.fn((props) => {
    CommentProps(props);
    return <div data-testId="Comment"></div>;
  }),
}));

it("displays Comment List", () => {
  render(<CommentList comments={comments} nestingLevel={0} />);
  expect(screen.getAllByTestId("Comment")).toHaveLength(comments.length);
  for (let comment of comments) {
    expect(CommentProps).toHaveBeenCalledWith({
      commentId: comment.id,
      nestingLevel: 0,
    });
  }
});
