import { FC, useState } from "react";
import { styled, css } from "styled-components";
import { useAsyncFn } from "../../../hooks/useAsync";
import { addComment, editComment } from "../services/comments";
import { ProfileAvatar } from "../../../components/ProfileAvatar";
import { useComment } from "../context/CommentsContext";
import { Button } from "../../../components/Button";
import { HoldYourHorses } from "./HoldYourHorses";
import { Loading } from "../../../components/Loading";
import { socket } from "../../../socket";

type EditCase = {
  action: "edit";
  onSubmit?: () => void;
  content: string;
  commentId: string;
  nestedClass?: boolean;
};

type AddCase = {
  action: "add";
  onSubmit?: () => void;
  parentId?: string;
  nestedClass?: boolean;
};

type AddCommentFormProps = EditCase | AddCase;

export const AddCommentForm: FC<AddCommentFormProps> = (props) => {
  const [isHoldingHorses, setIsHoldingHorses] = useState(false);
  const { userDetails, canIAddComment, setCanIAddComment, countDown } =
    useComment();
  const [content, setContent] = useState(
    props.action === "edit" ? props.content : ""
  );
  const { loading, execute } = useAsyncFn(addComment);
  const { loading: editLoading, execute: editExecute } =
    useAsyncFn(editComment);

  const afterCommentAdded = () => {
    if (canIAddComment) {
      setContent("");
      setTimeout(() => {
        setIsHoldingHorses(false);
      }, 60000);
      props.onSubmit && props.onSubmit();
      setCanIAddComment(false);
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (canIAddComment) {
      if (content !== "" && props.action === "add") {
        return execute({
          content,
          parentId: props.parentId,
          userId: userDetails._id,
        }).then(() => {
          afterCommentAdded();
        });
      } else if (content !== "" && props.action === "edit") {
        return editExecute({
          content,
          commentId: props.commentId,
        }).then(() => {
          afterCommentAdded();
        });
      }
    } else {
      setIsHoldingHorses(true);
    }
  };

  const isLoading = loading || editLoading;
  return (
    <>
      {isHoldingHorses && (
        <HoldYourHorses
          countDown={countDown}
          onClose={() => setIsHoldingHorses(false)}
        />
      )}

      <Form
        onSubmit={submitHandler}
        className={props.nestedClass ? "nested" : ""}
      >
        <ProfileAvatar imgName={userDetails.avatar} />
        <textarea
          autoFocus={props.nestedClass}
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button background="blue" disabled={isLoading}>
          Send
        </Button>
      </Form>
      {isLoading && <Loading topRightCorner={true} />}
    </>
  );
};

const Form = styled.form(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    gap: 15px;
    position: relative;

    &.nested {
      border: 1px solid ${theme.moderateBlue};
      margin-left: 22px;
      > textarea {
        height: 60px;
        border: 1px solid ${theme.moderateBlue};
        &:focus {
          outline-color: ${theme.moderateBlue};
        }
      }
      > button {
        font-size: 0.8rem;
        text-transform: unset;
      }
      > .profile-avatar {
        width: 30px;
        height: 30px;
      }

      @media screen and (min-width: 768px) {
        margin-left: 64px;
      }
      @media screen and (min-width: 1024px) {
        margin-left: 84px;
      }
    }

    > .profile-avatar {
      position: absolute;
      left: 15px;
      bottom: 15px;
      width: 40px;
      height: 40px;
    }

    > textarea {
      background-color: transparent;
      width: 100%;
      resize: none;
      height: 80px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      font-size: 0.9rem;
      padding: 10px;
      &:focus {
        outline-color: rgba(0, 0, 0, 0.2);
      }
    }

    > button {
      text-transform: uppercase;
    }

    @media screen and (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
      padding: 25px;
      padding-left: 85px;

      > textarea {
        height: 100px;
      }

      > .profile-avatar {
        left: 25px;
        top: 25px;
      }
    }
  `;
});
