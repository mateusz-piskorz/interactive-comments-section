/* eslint-disable @typescript-eslint/no-non-null-assertion */

import iconMinus from '../../assets/icon-minus.svg';
import iconPlus from '../../assets/icon-plus.svg';
import { useComment } from '@/context/comment';
import c from './main.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { tsr } from '@/utils/ts-client';

const { likeComment, dislikeComment } = tsr.comments;

type Props = {
  commentId: string;
};

export const LikesButton = ({ commentId }: Props) => {
  const user = useAuth();

  const { comment } = useComment(commentId);
  const { likes, likesCount, dislikes } = comment!;

  const { mutate: mutateLike } = likeComment.useMutation({
    mutationKey: ['likeComment'],
  });

  const { mutate: mutateDislike } = dislikeComment.useMutation({
    mutationKey: ['dislikeComment'],
  });

  const clickHandler = (likeType: 'like' | 'dislike') => {
    if (likeType === 'like') {
      mutateLike({ params: { id: commentId }, body: {} });
    } else {
      mutateDislike({ params: { id: commentId }, body: {} });
    }
  };

  return (
    <div className={c.LikesButton}>
      <button
        className={btnClassName(likes, user?.id || '')}
        onClick={() => clickHandler('like')}
      >
        <img src={iconPlus} alt="plus icon" />
      </button>
      <strong className={c.LikesButton_count}>{likesCount}</strong>
      <button
        className={btnClassName(dislikes, user?.id || '')}
        onClick={() => clickHandler('dislike')}
      >
        <img src={iconMinus} alt="minus icon" />
      </button>
    </div>
  );
};

const btnClassName = (arr: string[], id: string) => {
  const isLikeAdded = arr.find((e) => e === id);

  return `${c.LikesButton_button}${` ${
    isLikeAdded ? c.LikesButton_button___disabled : ''
  }`}`;
};
