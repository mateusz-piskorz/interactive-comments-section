import { FC } from "react";
import { Comment } from "../Comment";
import { useUser } from "../../context/user";
import c from "./CommentList.module.scss";
import { Comment as CommentType } from "../../types";

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
  const { user } = useUser();

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
