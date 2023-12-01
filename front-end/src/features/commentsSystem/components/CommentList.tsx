import { FC } from "react";
import { Comment } from "./Comment";
import { styled, css } from "styled-components";

type CommentListProps = {
  comments: any[];
  nestedClass?: boolean;
  nestingLevel: number;
};

export const CommentList: FC<CommentListProps> = ({
  comments,
  nestedClass,
  nestingLevel,
}) => {
  return (
    <CommentsWrapper className={nestedClass ? "nested" : ""}>
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} nestingLevel={nestingLevel} />
      ))}
    </CommentsWrapper>
  );
};

const CommentsWrapper = styled.div(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    gap: 15px;

    &.nested {
      padding-left: 20px;
      border-left: 2px solid rgba(0, 0, 0, 0.08);
      @media screen and (min-width: 768px) {
        padding-left: 30px;
        margin-left: 30px;
      }
      @media screen and (min-width: 1024px) {
        padding-left: 40px;
        margin-left: 40px;
      }
    }
  `;
});
