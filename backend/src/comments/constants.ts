import { selectUserFields } from 'src/users/constants';

export const selectCommentFields = {
  author: { select: selectUserFields },
  content: true,
  likes: true,
  dislikes: true,
  likesCount: true,
  createdAt: true,
  parentId: true,
  id: true,
};
