import { ProfileAvatar } from "../ProfileAvatar";
import { screen, render } from "@testing-library/react";

test("should render an avatar", () => {
  render(<ProfileAvatar imgName="avatar1" />);
  const img = screen.getByRole("img");
  expect(img).toBeInTheDocument();
});
