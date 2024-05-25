import { screen, render, waitFor } from "@testing-library/react";
import { Comment } from "./index";
import { comment1, comment2 } from "../../../tests/constants";
import { Post } from "./components/Post";
import { useEffect } from "react";

jest.mock("./components/Post", () => ({
  Post: jest.fn(({ commentId }) => <h1>{commentId}</h1>),
}));

jest.mock("../Form", () => ({
  Form: jest.fn(() => <h1>Form</h1>),
}));

it("displays Post", () => {
  render(<Comment commentId={comment1.id} nestingLevel={0} />);
  expect(screen.getByText(comment1.id)).toBeInTheDocument();
});

it("displays Posts children", () => {
  render(<Comment commentId={comment1.id} nestingLevel={0} />);
  expect(screen.getByText(comment2.id)).toBeInTheDocument();
});

it("doesn't display Form by default", async () => {
  render(<Comment commentId={comment2.id} nestingLevel={0} />);
  expect(screen.queryByText("Form")).toBeNull();
});

it("displays Form onReply function call", async () => {
  (Post as jest.Mock<any>).mockImplementation(({ onReply }) => {
    useEffect(() => {
      onReply();
    }, []);
    return <h1>Post</h1>;
  });
  render(<Comment commentId={comment2.id} nestingLevel={0} />);
  expect(screen.getByText("Form")).toBeInTheDocument();
});
