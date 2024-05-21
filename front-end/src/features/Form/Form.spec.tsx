import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { Form } from "./index";
import { addCommentService, editCommentService } from "../../services/comments";

const user = { id: "test" };
const mockedAddComment = addCommentService as jest.Mock<any>;

const DialogProps = jest.fn();
jest.mock("../Dialog", () => ({
  Dialog: jest.fn((props) => {
    DialogProps(props);
  }),
}));

jest.mock("../../services/comments");

const rootId = "root";
const content = "comment content";
const defaultProps = { operation: "add", parentId: rootId } as const;

it("doesn't call addComment if textbox is empty", async () => {
  render(<Form {...defaultProps} />);
  await screen.getByRole("button", { name: "send icon" }).click();
  expect(addCommentService).toHaveBeenCalledTimes(0);
});

it("displays initialContent for textbox", async () => {
  const initialContent = "initialContent";
  render(<Form {...defaultProps} initialContent={initialContent} />);
  expect(screen.getByRole("textbox")).toHaveTextContent(initialContent);
});

it("calls onSubmit on form submit", async () => {
  const onSubmit = jest.fn();
  render(<Form {...defaultProps} onSubmit={onSubmit} />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { innerText: content },
  });
  await screen.getByRole("button", { name: "send icon" }).click();
  expect(onSubmit).toHaveBeenCalled();
});

it("submits form on enter", async () => {
  const onSubmit = jest.fn();
  render(<Form {...defaultProps} onSubmit={onSubmit} />);
  const input = screen.getByRole("textbox");
  await fireEvent.change(input, {
    target: { innerText: content },
  });
  await fireEvent.keyDown(input, { code: "Enter" });
  expect(onSubmit).toHaveBeenCalled();
});

it("calls addComment on form submit", async () => {
  render(<Form {...defaultProps} />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { innerText: content },
  });
  await screen.getByRole("button", { name: "send icon" }).click();
  expect(addCommentService).toHaveBeenCalledWith({
    content,
    parentId: rootId,
    userId: user.id,
  });
});

it("calls editComment on form submit", async () => {
  render(<Form {...defaultProps} operation="edit" />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { innerText: content },
  });
  await screen.getByRole("button", { name: "send icon" }).click();
  expect(editCommentService).toHaveBeenCalledWith({
    content,
    commentId: rootId,
  });
});

it("displays dialog on error", async () => {
  const message = "test error";
  const elapsedTime = 120;
  mockedAddComment.mockRejectedValue({
    message,
    elapsedTime,
  });

  render(<Form {...defaultProps} />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { innerText: content },
  });
  await screen.getByRole("button", { name: "send icon" }).click();
  await waitFor(async () => {
    expect(DialogProps).toHaveBeenCalledWith(
      expect.objectContaining({ description: message, elapsedTime })
    );
  });
});
