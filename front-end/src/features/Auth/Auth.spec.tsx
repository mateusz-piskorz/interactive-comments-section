import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../tests/render";
import { Auth } from "./index";
import { signIn } from "./services";

jest.mock("./services");

jest.mock("./components/RegisterForm", () => ({
  RegisterForm: jest.fn(() => <div data-testid="RegisterForm"></div>),
}));

it("displays register", () => {
  render(<Auth />);

  expect(screen.getByTestId("RegisterForm")).toBeInTheDocument();
});

it("does not call signIn if localStorage is empty", async () => {
  render(<Auth />);

  expect(signIn).not.toHaveBeenCalled();
});
