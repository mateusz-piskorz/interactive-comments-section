import { AddCommentForm } from "../AddCommentForm";
import { screen, render, fireEvent } from "@testing-library/react";

test("should render a textbox", () => {
  render(<AddCommentForm action="add" />);
  const textbox = screen.getByRole("textbox");
  expect(textbox).toBeInTheDocument();
  expect(textbox).toHaveAttribute("placeholder", "Add a comment...");
});

test("should change textbox", async () => {
  const onClickHandler = jest.fn();
  render(<AddCommentForm action="add" onSubmit={onClickHandler} />);
  const textbox = screen.getByRole("textbox");
  const button = screen.getByRole("button");
  fireEvent.change(textbox, { target: { value: "new comment" } });
  expect(textbox).toHaveValue("new comment");
});
