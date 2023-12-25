import { render, screen } from "@testing-library/react";
import { Button } from "../Button";

test("renders a button", () => {
  render(<Button background="gold">btn text</Button>);
  const buttonEl = screen.getByText("btn text");
  expect(buttonEl).toBeInTheDocument();
});

test("button is clickable", () => {
  const onClickHandler = jest.fn();
  render(
    <Button onClick={onClickHandler} background="blue">
      btn text
    </Button>
  );
  const buttonEl = screen.getByText("btn text");
  expect(buttonEl).toBeInTheDocument();
  buttonEl.click();
  expect(onClickHandler).toBeCalled();
});

test("renders a disabled button", () => {
  render(
    <Button disabled background="blue">
      btn text
    </Button>
  );
  const buttonEl = screen.getByText("btn text");
  expect(buttonEl).toBeInTheDocument();
  expect(buttonEl).toBeDisabled();
});

test("renders a link button", () => {
  render(
    <Button linkBtn="google.com" background="blue">
      btn text
    </Button>
  );
  const aEl = screen.getByRole("link");
  expect(aEl).toBeInTheDocument();
  expect(aEl).toHaveAttribute("href", "google.com");
});
