import { FC, useState } from "react";
import { styled, css } from "styled-components";
import { useAsyncFn } from "../../../hooks/useAsync";
import { addComment } from "../services/comments";
import { ProfileAvatar } from "../../../components/ProfileAvatar";

type AddCommentFormProps = {
  onSubmit?: () => void;
  parentId?: string;
  nestedClass?: boolean;
};

export const AddCommentForm: FC<AddCommentFormProps> = ({
  onSubmit,
  parentId,
  nestedClass,
}) => {
  const [content, setContent] = useState("");
  const { loading, error, execute } = useAsyncFn(addComment);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (content !== "") {
      return execute({ content, parentId }).then((comment) => {
        console.log(comment);
        onSubmit && onSubmit();
      });
    }
  };
  return (
    <Form onSubmit={submitHandler} className={nestedClass ? "nested" : ""}>
      <ProfileAvatar imgName="avatar1" />
      <textarea
        autoFocus={nestedClass}
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Send</button>
    </Form>
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
        padding: 10px 15px 10px 15px;
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
      padding: 15px 25px 15px 25px;
      border: none;
      background-color: ${theme.moderateBlue};
      color: white;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      border-radius: 10px;
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
