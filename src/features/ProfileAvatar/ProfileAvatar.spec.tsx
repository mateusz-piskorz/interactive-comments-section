import { screen, render } from "@testing-library/react";
import { ProfileAvatar } from "./index";

it("displays profile img", () => {
  render(<ProfileAvatar imgName="avatar1" />);
  expect(screen.getByAltText("profile avatar")).toBeInTheDocument();
});
