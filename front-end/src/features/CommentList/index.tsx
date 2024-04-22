import { FC } from "react";
import { Comment } from "../Comment";
import { Comment as CommentType, useComment } from "../../context";
import c from "./CommentList.module.scss";

type CommentListProps = {
  comments: CommentType[];
  nestedClass?: boolean;
  nestingLevel: number;
};

export const CommentList: FC<CommentListProps> = ({
  comments,
  nestedClass,
  nestingLevel,
}) => {
  const className = `${c.CommentList}${` ${
    nestedClass ? c.CommentList___nested : ""
  }`}`;
  const { userDetails } = useComment();
  return (
    <div className={className}>
      {comments?.map(({ dislikes, likes, ...rest }) => (
        <Comment
          nestingLevel={nestingLevel}
          userId={userDetails._id}
          key={rest._id}
          {...rest}
        />
      ))}
    </div>
  );
};
