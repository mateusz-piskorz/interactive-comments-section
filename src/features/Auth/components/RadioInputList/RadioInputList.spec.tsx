import { screen, render } from "@testing-library/react";
import { RadioInputList } from "./index";

const defaultProps = {
  list: ["orange", "tomato"],
  name: "color" as const,
  selected: "tomato",
  setSelected: jest.fn(),
};

const RadioInputProps = jest.fn();

jest.mock("../RadioInput", () => ({
  RadioInput: jest.fn((props) => {
    RadioInputProps(props);
    return <div data-testId="RadioInput"></div>;
  }),
}));

it("displays name", () => {
  render(<RadioInputList {...defaultProps} />);
  expect(screen.getByText("Color")).toBeInTheDocument();
});

it("displays list of RadioInput", () => {
  const { name, setSelected } = defaultProps;
  render(<RadioInputList {...defaultProps} />);
  expect(screen.getAllByTestId("RadioInput")).toHaveLength(2);
  expect(RadioInputProps).toHaveBeenCalledWith({
    isSelected: false,
    name,
    setSelected,
    value: "orange",
  });
  expect(RadioInputProps).toHaveBeenCalledWith({
    isSelected: true,
    name,
    setSelected,
    value: "tomato",
  });
});
