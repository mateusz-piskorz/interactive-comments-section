import { screen, render } from "@testing-library/react";
import { RadioInput } from "./index";

const defaultProps = {
  isSelected: false,
  name: "color",
  setSelected: jest.fn(),
  value: "5",
} as const;

const ProfileAvatarProps = jest.fn();

jest.mock("../../../ProfileAvatar", () => ({
  ProfileAvatar: jest.fn((props) => {
    ProfileAvatarProps(props);
    return <div data-testId="ProfileAvatar"></div>;
  }),
}));

it("displays radio input", () => {
  render(<RadioInput {...defaultProps} />);
  expect(screen.getByRole("radio")).toHaveAttribute("name", defaultProps.name);
});

it("displays radio input not checked by default", () => {
  render(<RadioInput {...defaultProps} />);
  expect(screen.getByRole("radio")).not.toBeChecked();
});

it("displays checked radio input", () => {
  render(<RadioInput {...defaultProps} isSelected={true} />);
  expect(screen.getByRole("radio")).toBeChecked();
});

it("calls setSelected function on Change", () => {
  render(<RadioInput {...defaultProps} />);
  screen.getByRole("radio").click();
  expect(defaultProps.setSelected).toHaveBeenCalledWith(defaultProps.value);
});

it("displays ProfileAvatar with imgName props", () => {
  render(<RadioInput {...defaultProps} name="avatar" />);
  expect(screen.getByTestId("ProfileAvatar"));
  expect(ProfileAvatarProps).toHaveBeenCalledWith({
    imgName: defaultProps.value,
  });
});
