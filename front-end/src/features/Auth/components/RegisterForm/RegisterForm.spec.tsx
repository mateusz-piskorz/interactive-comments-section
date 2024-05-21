import { screen, render, fireEvent } from "@testing-library/react";
import { RegisterForm } from "./index";
import { register } from "../../services";
const onSubmit = jest.fn();

const RadioInputListProps = jest.fn();

jest.mock("../../services/user");
jest.mock("./components/RadioInputList", () => ({
  RadioInputList: jest.fn((props) => {
    RadioInputListProps(props);
    return <div data-testId="RadioInputList"></div>;
  }),
}));

it("displays input name", () => {
  render(<RegisterForm onSubmit={onSubmit} />);
  expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
});

it("displays RadioInputList", () => {
  render(<RegisterForm onSubmit={onSubmit} />);
  expect(screen.getAllByTestId("RadioInputList")).toHaveLength(2);
  expect(RadioInputListProps).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "color",
      list: ["orange", "teal", "violet", "seagreen", "burlywood", "tomato"],
    })
  );
  expect(RadioInputListProps).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "avatar",
      list: ["avatar1", "avatar6", "avatar4", "avatar3", "avatar5", "avatar2"],
    })
  );
});

it("calls register on form submit", async () => {
  render(<RegisterForm onSubmit={onSubmit} />);
  const inputValue = "name";
  await fireEvent.change(screen.getByRole("textbox"), {
    target: { value: inputValue },
  });
  screen.getByText("Create Account").click();

  expect(register).toHaveBeenCalledWith({
    avatar: "avatar1",
    color: "orange",
    name: inputValue,
  });
});
