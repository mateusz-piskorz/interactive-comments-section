/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useBookSlug } from '@/features/comments/context/BookSlug';
import iconMinus from '../../../assets/icon-minus.svg';
import iconPlus from '../../../assets/icon-plus.svg';
import { useComment } from '../../../context/Comments';
import c from './main.module.scss';
import { tsr } from '@/global/utils/ts-client';
import { useAuth } from '@/features/auth/context/auth';

const { likeComment, dislikeComment } = tsr.books.comments;

type Props = {
  commentId: string;
};

export const LikesButton = ({ commentId }: Props) => {
  const { bookSlug } = useBookSlug();
  const { user } = useAuth(true);

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
      mutateLike({ params: { id: commentId, bookSlug }, body: {} });
    } else {
      mutateDislike({ params: { id: commentId, bookSlug }, body: {} });
    }
  };

  return (
    <div className={c.LikesButton}>
      <button
        className={btnClassName(likes, user.id)}
        onClick={() => clickHandler('like')}
      >
        <img src={iconPlus} alt="plus icon" />
      </button>
      <strong className={c.LikesButton_count}>{likesCount}</strong>
      <button
        className={btnClassName(dislikes, user.id)}
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
