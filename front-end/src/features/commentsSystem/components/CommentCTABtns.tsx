import { FC } from "react";
import { styled, css } from "styled-components";
import iconDelete from "../assets/icon-delete.svg";
import iconEdit from "../assets/icon-edit.svg";
import iconReply from "../assets/icon-reply.svg";

type StrangerComment = {
  isYourComment: false;
  onReply: () => void;
};

type YourComment = {
  isYourComment: true;
  onEdit: () => void;
  onDelete: () => void;
};

type CommentCTABtnsProps = StrangerComment | YourComment;

export const CommentCTABtns: FC<CommentCTABtnsProps> = (props) => {
  return (
    <Wrapper>
      {props.isYourComment ? (
        <>
          <button className="delete-btn" onClick={props.onDelete}>
            <img src={iconDelete} alt="delete icon" />
            Delete
          </button>
          <button onClick={props.onEdit}>
            <img src={iconEdit} alt="edit icon" />
            Edit
          </button>
        </>
      ) : (
        <button onClick={props.onReply}>
          <img src={iconReply} alt="reply icon" />
          Reply
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div(({ theme }) => {
  return css`
    position: absolute;
    right: var(--paddingValue);
    bottom: calc(var(--paddingValue) + 9px);
    display: flex;
    gap: 20px;

    > button {
      background-color: transparent;
      border: none;
      color: ${theme.moderateBlue};
      font-weight: bolder;
      font-size: 0.9rem;
      display: flex;
      gap: 7px;
      align-items: center;
      cursor: pointer;

      &.delete-btn {
        color: ${theme.softRed};
      }
      &:hover {
        opacity: 0.7;
      }

      @media screen and (min-width: 1024px) {
        font-size: 1rem;
      }
    }

    @media screen and (min-width: 768px) {
      bottom: unset;
      top: calc(var(--paddingValue) + 7px);
    }
  `;
});
