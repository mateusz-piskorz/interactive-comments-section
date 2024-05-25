import { FC } from "react";
import { Comment } from "../Comment";
import c from "./CommentList.module.scss";
import { Comment as CommentType } from "../../types";

type CommentListProps = {
  comments: CommentType[];
  nestingLevel: number;
  nestedClass?: boolean;
};

export const CommentList: FC<CommentListProps> = ({
  comments,
  nestingLevel,
  nestedClass,
}) => {
  const className = `${c.CommentList}${` ${
    nestedClass ? c.CommentList___nested : ""
  }`}`;

  return (
    <div className={className}>
      {comments?.map(({ id }) => (
        <Comment nestingLevel={nestingLevel} commentId={id} key={id} />
      ))}
    </div>
  );
};
