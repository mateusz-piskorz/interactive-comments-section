import { FC, useEffect, useState } from "react";
import { ProfileAvatar, availableAvatars } from "../../../ProfileAvatar";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import c from "./Post.module.scss";
import { ActionButtons } from "../ActionButtons";
import { LikesButton } from "../LikesButton";
import { Dialog } from "../../../Dialog";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { removeComment } from "../../../../services/comments";

export type PostProps = {
  avatar: (typeof availableAvatars)[number];
  name: string;
  yourComment: boolean;
  createdAt: Date;
  content: string;
  color: string;
  dislikes: string[];
  likes: string[];
  likesCount: number;
  _id: string;
  userId: string;
  nestingLevel: number;
};

type ExtraProps = {
  onReply: () => void;
  onEdit: () => void;
};

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export const Post: FC<PostProps & ExtraProps> = ({
  avatar,
  name,
  yourComment,
  createdAt,
  content,
  color,
  _id,
  userId,
  nestingLevel,
  onReply,
  onEdit,
  ...likes
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const { execute, error, resData, setError } = useAsyncFn(removeComment);

  useEffect(() => {
    if (resData) {
      setShowDialog(false);
    }
  }, [resData]);

  const dialogProps = {
    onConfirm: error ? () => execute({ commentId: _id, userId }) : undefined,
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
        <strong className={c.Post_name}>{name}</strong>
        {yourComment && <strong className={c.Post_yourName}>you</strong>}
        <p className={c.Post_timeAgo}>
          {timeAgo.format(+new Date() - (+new Date() - +new Date(createdAt)))}
        </p>
      </div>
      <p className={c.Post_description}>{content}</p>
      <LikesButton {...likes} commentId={_id} />
      {(nestingLevel < 3 || yourComment) && (
        <ActionButtons
          isYourComment={yourComment}
          onDelete={() => setShowDialog(true)}
          onReply={onReply}
          onEdit={onEdit}
        />
      )}
      {showDialog && <Dialog {...dialogProps} />}
    </div>
  );
};
