import { CommentCTABtns } from "../CommentCTABtns";
import { screen, render } from "@testing-library/react";

test("should render reply button", () => {
  const mockFn = jest.fn();
  render(<CommentCTABtns isYourComment={false} onReply={mockFn} />);
  const btn = screen.getByText("Reply");
  btn.click();
  expect(mockFn).toBeCalled();
});

test("should render edit and delete button", () => {
  const mockFn = jest.fn();
  render(
    <CommentCTABtns isYourComment={true} onDelete={mockFn} onEdit={mockFn} />
  );
  const deleteBtn = screen.getByText("Delete");
  const editBtn = screen.getByText("Edit");
  expect(editBtn).toBeInTheDocument();
  deleteBtn.click();
  expect(mockFn).toBeCalled();
});
