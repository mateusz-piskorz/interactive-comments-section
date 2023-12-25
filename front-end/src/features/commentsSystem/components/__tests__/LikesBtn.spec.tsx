import { LikesBtn } from "../LikesBtn";
import { screen, render } from "@testing-library/react";

test("should render correct amount of likes", () => {
  render(<LikesBtn commentId="fgregrew" commentLikes={{ frewg: "plus" }} />);
  const likes = screen.getByText(1);
  expect(likes).toBeInTheDocument();
});
