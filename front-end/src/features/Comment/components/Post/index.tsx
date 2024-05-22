import { FC, useEffect, useState } from "react";
import { ProfileAvatar } from "../../../ProfileAvatar";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import c from "./Post.module.scss";
import { ActionButtons } from "../ActionButtons";
import { LikesButton } from "../LikesButton";
import { Dialog } from "../../../Dialog";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { removeComment } from "../../../../services/comments";
import { useComment } from "../../../../context/comment";
import { useAuth } from "../../../Auth";

export type PostProps = {
  commentId: string;
  nestingLevel: number;
};

type ExtraProps = {
  onReply: () => void;
  onEdit: () => void;
};

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export const Post: FC<PostProps & ExtraProps> = ({
  commentId,
  nestingLevel,
  onReply,
  onEdit,
}) => {
  const { user } = useAuth();
  const { id: userId } = user!;
  const { comment } = useComment(commentId);
  const {
    content,
    createdAt,
    author: { username, color, avatar, id },
  } = comment!;
  const [showDialog, setShowDialog] = useState(false);
  const { execute, error, resData, setError } = useAsyncFn(removeComment);
  const isYourComment = userId === id;
  useEffect(() => {
    if (resData) {
      setShowDialog(false);
    }
  }, [resData]);

  const dialogProps = {
    onConfirm: !error ? () => execute({ commentId, userId }) : undefined,
    onCancel: () => {
      setShowDialog(false);
      setError(false);
    },
    description: error
      ? error.message
      : "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
  };

  return (
    <div className={c.Post}>
      <div
        style={{ backgroundColor: color }}
        className={c.Post_circleLabel}
      ></div>
      <div className={c.Post_profile}>
        <ProfileAvatar imgName={avatar} />
        <strong className={c.Post_name}>{username}</strong>
        {isYourComment && <strong className={c.Post_yourName}>you</strong>}
        <p className={c.Post_timeAgo}>
          {timeAgo.format(+new Date() - (+new Date() - +new Date(createdAt)))}
        </p>
      </div>
      <p className={c.Post_description}>{content}</p>
      <LikesButton commentId={commentId} />
      {(nestingLevel < 3 || isYourComment) && (
        <ActionButtons
          isYourComment={isYourComment}
          onDelete={() => setShowDialog(true)}
          onReply={onReply}
          onEdit={onEdit}
        />
      )}
      {showDialog && <Dialog {...dialogProps} />}
    </div>
  );
};
