import { screen, render } from "@testing-library/react";
import { Dialog } from "./index";

const defaultProps = {
  onCancel: jest.fn(),
  description: "description",
  elapsedTime: 120,
  onConfirm: jest.fn(),
};

const OverlayProps = jest.fn();
jest.mock("../Overlay", () => ({
  Overlay: jest.fn((props) => {
    OverlayProps(props);
  }),
}));

it("displays heading", () => {
  render(<Dialog {...defaultProps} />);
  expect(screen.getByRole("heading", { name: "Info" })).toBeInTheDocument();
});

it("displays description", () => {
  render(<Dialog {...defaultProps} />);
  expect(screen.getByText("description")).toBeInTheDocument();
});

it("displays OverlayProps", () => {
  render(<Dialog {...defaultProps} />);
  expect(OverlayProps).toHaveBeenCalledWith({ onClick: defaultProps.onCancel });
});

it("calls CANCEL on cancel button click", () => {
  render(<Dialog {...defaultProps} />);
  screen.getByText("CANCEL").click();
  expect(defaultProps.onCancel).toHaveBeenCalled();
});

it("calls CONFIRM on confirm button click", () => {
  render(<Dialog {...defaultProps} />);
  screen.getByText("CONFIRM").click();
  expect(defaultProps.onConfirm).toHaveBeenCalled();
});
