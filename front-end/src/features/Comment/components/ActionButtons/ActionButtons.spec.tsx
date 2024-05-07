import { screen, render } from "@testing-library/react";
import { ActionButtons } from "./index";

it("displays only reply button, if yourComment is false", () => {
  render(<ActionButtons isYourComment={false} />);
  expect(screen.getByAltText("reply icon").closest("button")).toHaveTextContent(
    "Reply"
  );
  expect(screen.queryByAltText("edit icon")).toBeNull();
  expect(screen.queryByText("Edit")).toBeNull();
  expect(screen.queryByAltText("delete icon")).toBeNull();
  expect(screen.queryByText("Delete")).toBeNull();
});

it("displays only edit and delete button, if yourComment is true", () => {
  render(<ActionButtons isYourComment={true} />);
  expect(screen.getByAltText("edit icon").closest("button")).toHaveTextContent(
    "Edit"
  );
  expect(
    screen.getByAltText("delete icon").closest("button")
  ).toHaveTextContent("Delete");
  expect(screen.queryByAltText("reply icon")).toBeNull();
  expect(screen.queryByText("Reply")).toBeNull();
});

it("calls onReply after clicking reply button", () => {
  const onReply = jest.fn();
  render(<ActionButtons isYourComment={false} onReply={onReply} />);
  screen.getByText("Reply").click();
  expect(onReply).toHaveBeenCalled();
});

it("calls onDelete after clicking delete button", () => {
  const onDelete = jest.fn();
  render(<ActionButtons isYourComment={true} onDelete={onDelete} />);
  screen.getByText("Delete").click();
  expect(onDelete).toHaveBeenCalled();
});

it("calls onEdit after clicking edit button", () => {
  const onEdit = jest.fn();
  render(<ActionButtons isYourComment={true} onEdit={onEdit} />);
  screen.getByText("Edit").click();
  expect(onEdit).toHaveBeenCalled();
});
