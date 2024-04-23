import { FC } from "react";
import { Comment } from "../Comment";
import { useUser } from "../../context/user";
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
  const { user } = useUser();
  const className = `${c.CommentList}${` ${
    nestedClass ? c.CommentList___nested : ""
  }`}`;

  return (
    <div className={className}>
      {comments?.map(({ ...props }) => (
        <Comment
          nestingLevel={nestingLevel}
          userId={user._id}
          key={props._id}
          {...props}
        />
      ))}
    </div>
  );
};
