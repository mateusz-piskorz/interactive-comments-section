import { screen, render, waitFor } from "@testing-library/react";
import { LikesButton } from "./index";
import { addLike } from "../../../../services/comments";
import { user, comment } from "../../../../../tests/constants";

jest.mock("../../../Dialog", () => ({
  Dialog: jest.fn(() => <h1>Dialog</h1>),
}));

jest.mock("../../../../services/comments");

// it("displays likes Count", () => {
//   render(<LikesButton commentId={comment._id} />);
//   expect(screen.getByText(comment.likesCount)).toBeInTheDocument();
// });

// it("calls clickHandler like after clicking like button", () => {
//   render(<LikesButton commentId={comment._id} />);
//   screen.getByAltText("plus icon").closest("button")?.click();
//   expect(addLike).toHaveBeenCalledWith({
//     commentId: comment._id,
//     likeType: "like",
//     userId: user._id,
//   });
// });

// it("calls clickHandler dislike after clicking dislike button", () => {
//   render(<LikesButton commentId={comment._id} />);
//   screen.getByAltText("minus icon").closest("button")?.click();
//   expect(addLike).toHaveBeenCalledWith({
//     commentId: comment._id,
//     likeType: "dislike",
//     userId: user._id,
//   });
// });

// it("displays dialog on error", async () => {
//   (addLike as jest.Mock<any>).mockRejectedValue({});
//   render(<LikesButton commentId={comment._id} />);
//   screen.getByAltText("minus icon").closest("button")?.click();
//   await waitFor(async () => {
//     expect(screen.getByText("Dialog")).toBeInTheDocument();
//   });
// });
