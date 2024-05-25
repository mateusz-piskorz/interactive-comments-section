import { screen, waitFor } from "@testing-library/react";
import { LikesButton } from "./index";
import { addLike } from "../../services";
import { user, comment1 } from "../../../../../tests/constants";
import { render } from "../../../../../tests/render";

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

it("calls clickHandler like after clicking like button", async () => {
  render(<LikesButton commentId={comment1.id} />);
  screen.getByAltText("plus icon").closest("button")?.click();
  await waitFor(async () => {
    expect(addLike).toHaveBeenCalledWith({
      commentId: comment1.id,
      likeType: "like",
    });
  });
});

it("calls clickHandler dislike after clicking dislike button", async () => {
  render(<LikesButton commentId={comment1.id} />);
  screen.getByAltText("minus icon").closest("button")?.click();
  await waitFor(async () => {
    expect(addLike).toHaveBeenCalledWith({
      commentId: comment1.id,
      likeType: "dislike",
    });
  });
});

it("displays dialog on error", async () => {
  const message = "messageTest";
  const remainingTime = 120;
  mockedAddLike.mockRejectedValue({ message, remainingTime });
  render(<LikesButton commentId={comment1.id} />);
  screen.getByAltText("minus icon").closest("button")?.click();
  await waitFor(async () => {
    expect(DialogProps).toHaveBeenCalledWith(
      expect.objectContaining({
        description: message,
        remainingTime,
      })
    );
  });
});
