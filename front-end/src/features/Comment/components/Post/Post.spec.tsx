import { screen, waitFor } from "@testing-library/react";
import { Post } from "./index";
import { comment1, user } from "../../../../../tests/constants";
import { render } from "../../../../../tests/render";
import { useComment } from "../../../../context/comment";

const avatar = "avatar1";
const defaultProps = {
  nestingLevel: 0,
  commentId: comment1.id,
  onEdit: jest.fn(),
  onReply: jest.fn(),
};

const ProfileAvatarProps = jest.fn();
jest.mock("../../../ProfileAvatar", () => ({
  ProfileAvatar: jest.fn((props) => {
    ProfileAvatarProps(props);
  }),
}));

const LikesButtonProps = jest.fn();
jest.mock("../LikesButton", () => ({
  LikesButton: jest.fn((props) => {
    LikesButtonProps(props);
  }),
}));

const ActionButtonsProps = jest.fn();
jest.mock("../ActionButtons", () => ({
  ActionButtons: jest.fn((props) => {
    ActionButtonsProps(props);
    return <div data-testId="ActionButtons"></div>;
  }),
}));

it("displays ProfileAvatar", () => {
  render(<Post {...defaultProps} />);
  expect(ProfileAvatarProps).toHaveBeenCalledWith({ imgName: avatar });
});

it("displays comment author name", () => {
  render(<Post {...defaultProps} />);
  expect(screen.getByText(comment1.author.username)).toBeInTheDocument();
});

it("doesn't display you text if it's not your comment", () => {
  render(<Post {...defaultProps} />);
  expect(screen.queryByText("you")).toBeNull();
});

it("displays you text if it's your comment", () => {
  (useComment as jest.Mock<any>).mockReturnValue({
    comment: { ...comment1, author: { ...comment1.author, id: user.id } },
  });
  render(<Post {...defaultProps} />);
  expect(screen.getByText("you")).toBeInTheDocument();
});

it("displays created time ago", () => {
  (useComment as jest.Mock<any>).mockReturnValue({
    comment: {
      ...comment1,
      createdAt: new Date(comment1.createdAt.getTime() - 5 * 60000),
    },
  });
  render(<Post {...defaultProps} />);
  expect(screen.getByText("5 minutes ago")).toBeInTheDocument();
});

it("displays comment content", () => {
  render(<Post {...defaultProps} />);
  expect(screen.getByText(comment1.content)).toBeInTheDocument();
});

it("displays LikesButton", () => {
  render(<Post {...defaultProps} />);
  expect(LikesButtonProps).toHaveBeenCalledWith({
    commentId: defaultProps.commentId,
  });
});

it("displays ActionButtons", () => {
  render(<Post {...defaultProps} />);
  expect(ActionButtonsProps).toHaveBeenCalledWith(
    expect.objectContaining({
      isYourComment: false,
      onEdit: defaultProps.onEdit,
      onReply: defaultProps.onReply,
    })
  );
});

it("doesn't display ActionButtons if nesting level > 2", () => {
  render(<Post {...defaultProps} nestingLevel={3} />);
  expect(screen.queryByTestId("ActionButtons")).toBeNull();
});
