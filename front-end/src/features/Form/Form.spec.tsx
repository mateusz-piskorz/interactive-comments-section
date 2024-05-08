import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { Form } from "./index";
import { addComment, editComment } from "../../services/comments";
import { useUser } from "../../context/user";

const { user } = useUser();

jest.mock("../Dialog", () => ({ Dialog: jest.fn(() => <h1>Dialog</h1>) }));

jest.mock("../../services/comments");

const rootId = "root";
const content = "comment content";
const defaultProps = { operation: "add", parentId: rootId } as const;

it("doesn't call addComment if textbox is empty", async () => {
  render(<Form {...defaultProps} />);
  await screen.getByText("Send").click();
  expect(addComment).toHaveBeenCalledTimes(0);
});

it("displays initialContent for textbox", async () => {
  const initialContent = "initialContent";
  render(<Form {...defaultProps} initialContent={initialContent} />);
  await screen.getByText("Send").click();
  expect(screen.getByRole("textbox")).toHaveTextContent(initialContent);
});

it("calls onSubmit on form submit", async () => {
  const onSubmit = jest.fn();
  render(<Form {...defaultProps} onSubmit={onSubmit} />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { value: content },
  });
  screen.getByText("Send").click();
  await waitFor(async () => {
    expect(onSubmit).toHaveBeenCalled();
  });
});

it("calls addComment on form submit", async () => {
  render(<Form {...defaultProps} />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { value: content },
  });
  await screen.getByText("Send").click();
  expect(addComment).toHaveBeenCalledWith({
    content,
    parentId: rootId,
    userId: user._id,
  });
});

it("calls editComment on form submit", async () => {
  render(<Form {...defaultProps} operation="edit" />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { value: content },
  });
  await screen.getByText("Send").click();
  expect(editComment).toHaveBeenCalledWith({
    content,
    commentId: rootId,
  });
});

it("displays dialog on error", async () => {
  (addComment as jest.Mock<any>).mockRejectedValue({});
  render(<Form {...defaultProps} />);
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { value: content },
  });
  screen.getByText("Send").click();
  await waitFor(async () => {
    expect(screen.getByText("Dialog")).toBeInTheDocument();
  });
});
