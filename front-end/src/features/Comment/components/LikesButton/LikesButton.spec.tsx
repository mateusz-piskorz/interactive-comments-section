import { screen, render, waitFor } from "@testing-library/react";
import { LikesButton } from "./index";
import { addLike } from "../../../../services/comments";
import { user } from "../../../../../tests/constants";

const defaultProps = {
  commentId: "32432r32",
  dislikes: [],
  likes: [],
  likesCount: 4,
};

jest.mock("../../../Dialog", () => ({
  Dialog: jest.fn(() => <h1>Dialog</h1>),
}));

jest.mock("../../../../services/comments");

it("displays likes Count", () => {
  render(<LikesButton {...defaultProps} />);
  expect(screen.getByText(defaultProps.likesCount)).toBeInTheDocument();
});

it("calls clickHandler like after clicking like button", () => {
  render(<LikesButton {...defaultProps} />);
  screen.getByAltText("plus icon").closest("button")?.click();
  expect(addLike).toHaveBeenCalledWith({
    commentId: defaultProps.commentId,
    likeType: "like",
    userId: user._id,
  });
});

it("calls clickHandler dislike after clicking dislike button", () => {
  render(<LikesButton {...defaultProps} />);
  screen.getByAltText("minus icon").closest("button")?.click();
  expect(addLike).toHaveBeenCalledWith({
    commentId: defaultProps.commentId,
    likeType: "dislike",
    userId: user._id,
  });
});

it("displays dialog on error", async () => {
  (addLike as jest.Mock<any>).mockRejectedValue({});
  render(<LikesButton {...defaultProps} />);
  screen.getByAltText("minus icon").closest("button")?.click();
  await waitFor(async () => {
    expect(screen.getByText("Dialog")).toBeInTheDocument();
  });
});
