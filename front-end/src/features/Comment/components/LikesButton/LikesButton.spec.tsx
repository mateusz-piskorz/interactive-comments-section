import { screen, render, waitFor } from "@testing-library/react";
import { LikesButton } from "./index";
import { addLike } from "../../services";
import { user, comment1 } from "../../../../../tests/constants";

const mockedAddLike = addLike as jest.Mock<any>;

const DialogProps = jest.fn();
jest.mock("../../../Dialog", () => ({
  Dialog: jest.fn((props) => {
    DialogProps(props);
  }),
}));

jest.mock("../../services");

it("displays likes Count", () => {
  render(<LikesButton commentId={comment1.id} />);
  expect(screen.getByText(comment1.likesCount)).toBeInTheDocument();
});

it("calls clickHandler like after clicking like button", () => {
  render(<LikesButton commentId={comment1.id} />);
  screen.getByAltText("plus icon").closest("button")?.click();
  expect(addLike).toHaveBeenCalledWith({
    commentId: comment1.id,
    likeType: "like",
    userId: user.id,
  });
});

it("calls clickHandler dislike after clicking dislike button", () => {
  render(<LikesButton commentId={comment1.id} />);
  screen.getByAltText("minus icon").closest("button")?.click();
  expect(addLike).toHaveBeenCalledWith({
    commentId: comment1.id,
    likeType: "dislike",
    userId: user.id,
  });
});

it("displays dialog on error", async () => {
  const message = "messageTest";
  const elapsedTime = 120;
  mockedAddLike.mockRejectedValue({ message, elapsedTime });
  render(<LikesButton commentId={comment1.id} />);
  screen.getByAltText("minus icon").closest("button")?.click();
  await waitFor(async () => {
    expect(DialogProps).toHaveBeenCalledWith(
      expect.objectContaining({
        description: message,
        elapsedTime,
      })
    );
  });
});
