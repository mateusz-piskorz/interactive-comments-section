import { screen, waitFor, fireEvent } from "@testing-library/react";
import { Form } from "./index";
import { addComment, editComment } from "./services";
import { render } from "../../../tests/render";

const mockedAddComment = addComment as jest.Mock<any>;

jest.mock("./services");

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
  expect(addComment).toHaveBeenCalledTimes(0);
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
  await waitFor(async () => {
    expect(onSubmit).toHaveBeenCalled();
  });
});

it("submits form on enter", async () => {
  const onSubmit = jest.fn();
  render(<Form {...defaultProps} onSubmit={onSubmit} />);
  const input = screen.getByRole("textbox");
  await fireEvent.change(input, {
    target: { innerText: content },
  });
  await fireEvent.keyDown(input, { code: "Enter" });
  await waitFor(async () => {
    expect(onSubmit).toHaveBeenCalled();
  });
});

it("calls addComment on form submit", async () => {
  render(<Form {...defaultProps} />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { innerText: content },
  });
  await screen.getByRole("button", { name: "send icon" }).click();

  await waitFor(async () => {
    expect(addComment).toHaveBeenCalledWith({
      content,
      parentId: rootId,
    });
  });
});

it("calls editComment on form submit", async () => {
  render(<Form {...defaultProps} operation="edit" />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { innerText: content },
  });
  await screen.getByRole("button", { name: "send icon" }).click();
  await expect(() => {
    expect(editComment).toHaveBeenCalledWith({
      content,
      commentId: rootId,
    });
  });
});

it("displays dialog on error", async () => {
  const message = "test error";
  const remainingTime = 120;
  mockedAddComment.mockRejectedValue({
    message,
    remainingTime,
  });

  render(<Form {...defaultProps} />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { innerText: content },
  });
  await screen.getByRole("button", { name: "send icon" }).click();
  await waitFor(async () => {
    expect(DialogProps).toHaveBeenCalledWith(
      expect.objectContaining({ description: message, remainingTime })
    );
  });
});
