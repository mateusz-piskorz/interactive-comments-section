import { FC } from "react";
import { styled, css } from "styled-components";
import iconMinus from "../assets/icon-minus.svg";
import iconPlus from "../assets/icon-plus.svg";
import { useAsyncFn } from "../../../hooks/useAsync";
import { addLike } from "../services/comments";
import { useComment } from "../context/CommentsContext";
import { Likes } from "./Comment";

type LikesBtnProps = {
  commentId: string;
  commentLikes: Likes;
};

export const LikesBtn: FC<LikesBtnProps> = ({ commentId, commentLikes }) => {
  const { userDetails } = useComment();
  const { error, loading, execute } = useAsyncFn(addLike);
  const likeIGave = commentLikes[userDetails._id];

  const numberOfLikes = Object.values(commentLikes).reduce(
    (accumulator, currentValue) => {
      const helper = { plus: 1, minus: -1 };

      if (typeof accumulator === "string") {
        return helper[accumulator] + helper[currentValue];
      } else {
        return accumulator + helper[currentValue];
      }
    },
    0
  );

  const onBtnClick = (like: "plus" | "minus") => {
    if (likeIGave) {
      if (likeIGave === like) {
        alert("You already rated this");
      } else {
        execute({ commentId, like, userId: userDetails._id });
      }
    } else {
      execute({ commentId, like, userId: userDetails._id });
    }
  };

  return (
    <Wrapper className="like-container">
      <button
        disabled={likeIGave === "plus"}
        onClick={() => onBtnClick("plus")}
      >
        <img src={iconPlus} alt="plus icon" />
      </button>
      <strong>{numberOfLikes}</strong>
      <button
        disabled={likeIGave === "minus"}
        onClick={() => onBtnClick("minus")}
      >
        <img src={iconMinus} alt="minus icon" />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div(({ theme }) => {
  return css`
    display: inline-flex;
    background-color: ${theme.veryLightGray};
    padding: 8px 13px 8px 13px;
    border-radius: 10px;
    gap: 20px;

    > strong {
      color: ${theme.moderateBlue};
      font-size: 0.9rem;
    }

    > button {
      background-color: transparent;
      border: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      &:disabled {
        cursor: default;
        opacity: 0.5;
        &:hover {
          opacity: 0.5;
        }
      }
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }

    @media screen and (min-width: 768px) {
      flex-direction: column;
      padding: 15px 10px 15px 10px;
      gap: 15px;

      > strong {
        font-size: 0.9rem;
      }
    }
  `;
});
