/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useState } from 'react';
import { ProfileAvatar } from '@/global/components/ProfileAvatar';
import c from './main.module.scss';
import { ActionButtons } from '../ActionButtons';
import { LikesButton } from '../LikesButton';
import { useComment } from '../../../context/Comments';
import { tsr } from '@/global/utils/ts-client';
import { ConfirmDialog } from '@/global/components/ConfirmDialog';
import { toast } from 'sonner';
import { useAuth } from '@/features/auth/context/auth';

const { removeComment } = tsr.books.comments;

const ClockToast = ({
  message,
  remainingTime,
}: {
  message: string;
  remainingTime: number;
}) => (
  <>
    <p>{message}</p>
    <p>{remainingTime}</p>
  </>
);

export type PostProps = {
  commentId: string;
  nestingLevel: number;
};

type ExtraProps = {
  onReply: () => void;
  onEdit: () => void;
};

export const Post = ({
  commentId,
  nestingLevel,
  onReply,
  onEdit,
}: PostProps & ExtraProps) => {
  const { user } = useAuth(true);

  const { comment } = useComment(commentId);
  const { content, createdAt, author } = comment!;
  const { username, color, avatar, id } = author;
  const [open, setOpen] = useState(false);

  const removeHandler = async () => {
    try {
      const { body, status } = await removeComment.mutate({
        body: {},
        params: { id: commentId, bookSlug: '' },
      });

      switch (status) {
        case 200: {
          toast.success('comment removed');
          break;
        }

        case 403: {
          toast.error(<ClockToast {...body} />);
          break;
        }

        default: {
          // @ts-ignore
          throw new Error(body?.message || 'failed to remove comment');
        }
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const isYourComment = user.id === id;

  return (
    <div className={c.Post}>
      <div style={{ backgroundColor: color }} className={c.Post_circleLabel} />
      <div className={c.Post_profile}>
        <ProfileAvatar avatar={avatar} />
        <strong className={c.Post_name}>{username}</strong>
        {isYourComment && <strong className={c.Post_yourName}>you</strong>}
        <p className={c.Post_timeAgo}>
          created at {createdAt.toLocaleString()}
          {/* {timeAgo.format(+new Date() - (+new Date() - +new Date(createdAt)))} */}
        </p>
      </div>
      <p className={c.Post_description}>{content}</p>
      <LikesButton commentId={commentId} />
      {(nestingLevel < 3 || isYourComment) && (
        <ActionButtons
          isYourComment={isYourComment}
          onDelete={() => setOpen(true)}
          onReply={onReply}
          onEdit={onEdit}
        />
      )}

      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        onConfirm={removeHandler}
        description="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
      />
    </div>
  );
};
