import { FC, useState } from "react";
import { ProfileAvatar } from "../../../ProfileAvatar";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import c from "./Post.module.scss";
import { ActionButtons } from "../ActionButtons";
import { LikesButton } from "../LikesButton";
import { Dialog } from "../../../Dialog";
import { removeComment } from "../../../../services/comments";
import { useComment } from "../../../../context/comment";
import { useAuth } from "../../../Auth";
import { useMutation } from "@tanstack/react-query";
import { useEvent } from "@owcaofficial/web-analytics";

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
  const sendEvent = useEvent();
  const { user } = useAuth();
  const { id: userId } = user!;
  const { comment } = useComment(commentId);
  const {
    content,
    createdAt,
    author: { username, color, avatar, id },
  } = comment!;
  const [showDialog, setShowDialog] = useState(false);
  const { status, mutate, reset, error } = useMutation({
    onSuccess: () => {
      setShowDialog(false);
    },
    mutationFn: removeComment,
    mutationKey: ["removeComment"],
  });

  const isYourComment = userId === id;

  const dialogProps = {
    onConfirm:
      status !== "error"
        ? () => {
            mutate({ commentId, userId });
            sendEvent("remove_comment_action", "remove_comment");
          }
        : undefined,
    onCancel: () => {
      setShowDialog(false);
      reset();
    },
    description:
      status === "error"
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
